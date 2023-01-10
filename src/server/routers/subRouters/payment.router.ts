import Stripe from "stripe";
import { getCartProductsInputSchema } from "../../../helpers/validations/productRoutesSchema";
import { stripe } from "../../../lib/servers/stripe";
import { checkoutProducts } from "../../handlers/orders/checkoutProducts";
import { userProcedure } from "../../procedures";
import { z } from "zod";
import { router } from "../../trpc";

export const paymentRouter = router({
  intent: userProcedure
    .input(getCartProductsInputSchema)
    .mutation(async ({ ctx, input }) => {
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
        if (ex instanceof Error) {
          throw new Error(`Stripe error: ${ex.message}`);
        }
        throw new Error("There's an error with the stripe");
      }
      await ctx.prisma.order.updateMany({
        where: {
          id: order.id,
          userId: ctx.session.user.id,
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
