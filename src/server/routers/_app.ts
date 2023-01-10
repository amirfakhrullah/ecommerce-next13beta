import { router } from "../trpc";
import { orderRouter } from "./subRouters/order.router";
import { paymentRouter } from "./subRouters/payment.router";
import { productRouter } from "./subRouters/product.router";
import { userRouter } from "./subRouters/user.router";

export const appRouter = router({
  user: userRouter,
  product: productRouter,
  payment: paymentRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
