import { router } from "../trpc";
import { productRoutes } from "./routes/product.route";
import { userRoutes } from "./routes/user.route";

export const appRouter = router({
  ...productRoutes,
  ...userRoutes,
});

// export type definition of API
export type AppRouter = typeof appRouter;
