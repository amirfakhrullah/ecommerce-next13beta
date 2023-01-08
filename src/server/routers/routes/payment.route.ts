import Stripe from "stripe";
import { getCartProductsInputSchema } from "../../../helpers/validations/productRoutesSchema";
import { stripe } from "../../../lib/servers/stripe";
import { failOrder } from "../../handlers/orders/failOrder";
import { checkoutProducts } from "../../handlers/orders/checkoutProducts";
import { userProcedure } from "../../procedures";

export const paymentRoute = {
  createPaymentIntent: userProcedure
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
        await failOrder(order.id, ctx.prisma);
        throw new Error("There's an error with the stripe");
      }
      await ctx.prisma.order.update({
        where: {
          id: order.id
        },
        data: {
          stripePaymentIntent: paymentIntent.client_secret,
        },
      });

      return paymentIntent.client_secret;
    }),
};
