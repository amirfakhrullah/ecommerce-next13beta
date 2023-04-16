import Stripe from "stripe";
import { getCartProductsInputSchema } from "../../../helpers/validations/productRoutesSchema";
import { stripe } from "../../../lib/servers/stripe";
import { checkoutProducts } from "../../handlers/orders/checkoutProducts";
import { userProcedure } from "../../procedures";
import { z } from "zod";
import { router } from "../../trpc";
import { LIMIT_ORDERS_PER_USER } from "../../../constants";
import { TRPCError } from "@trpc/server";
import { UserType } from "@prisma/client";

export const paymentRouter = router({
  intent: userProcedure
    .input(getCartProductsInputSchema)
    .mutation(async ({ ctx, input }) => {
      /**
       * Pre-check if the user has reached the limit orders
       * Check only for non-admins
       */
      const { _count, userType } =
        (await ctx.prisma.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
          select: {
            userType: true,
            _count: {
              select: {
                orders: true,
              },
            },
          },
        })) || {};

      if (
        userType === UserType.User &&
        _count!.orders >= LIMIT_ORDERS_PER_USER
      ) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "You have reached your limit orders",
        });
      }

      /**
       * checkout intent
       */
      const { order, totalPrice } = await checkoutProducts(
        input,
        ctx.session.user.id,
        ctx.prisma
      );

      let paymentIntent: Stripe.Response<Stripe.PaymentIntent>;

      try {
        paymentIntent = await stripe.paymentIntents.create({
          amount: totalPrice * 100,
          currency: "usd",
          payment_method_types: ["card"],
        });
      } catch (ex) {
        throw new Error(`Stripe error: ${JSON.stringify(ex)}`);
      }

      await ctx.prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          stripePaymentIntentId: paymentIntent.id,
          stripePaymentClientSecret: paymentIntent.client_secret,
          updatedAt: new Date(),
        },
      });

      return {
        orderId: order.id,
        paymentIntentClientSecret: paymentIntent.client_secret,
      };
    }),

  checkStatus: userProcedure
    .input(
      z.object({
        paymentIntent: z.string(),
        paymentIntentClientSecret: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findFirst({
        where: {
          userId: ctx.session.user.id,
          stripePaymentIntentId: input.paymentIntent,
          stripePaymentClientSecret: input.paymentIntentClientSecret,
        },
        select: {
          status: true,
          id: true,
          orderItems: {
            select: {
              productId: true,
              size: true,
            },
          },
        },
      });

      if (!order) return;

      return {
        ...order,
        orderItems: order.orderItems.map((item) => ({
          productId: item.productId,
          size: item.size.toString(),
        })),
      };
    }),
});
