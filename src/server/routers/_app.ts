import { router } from "../trpc";
import { paymentRoute } from "./routes/payment.route";
import { productRoutes } from "./routes/product.route";
import { userRoutes } from "./routes/user.route";

export const appRouter = router({
  ...productRoutes,
  ...userRoutes,
  ...paymentRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;
