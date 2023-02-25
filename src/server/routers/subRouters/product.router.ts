import { PRODUCTS_PER_PAGE } from "../../../constants";
import {
  getCartProductsInputSchema,
  searchProductsSchema,
} from "../../../helpers/validations/productRoutesSchema";
import { getCartProducts } from "../../handlers/products/getCartProducts";
import { getProductsBySearch } from "../../handlers/products/getProductsBySearch";
import { procedure, router } from "../../trpc";

export const productRouter = router({
  search: procedure
    .input(searchProductsSchema)
    .query(async ({ ctx, input }) => {
      const { search, page } = input;
      if (!search) return [];
      return getProductsBySearch(
        search,
        PRODUCTS_PER_PAGE,
        (page - 1) * PRODUCTS_PER_PAGE,
        ctx.prisma
      );
    }),
  carts: procedure
    .input(getCartProductsInputSchema)
    .query(async ({ ctx, input }) => {
      return getCartProducts(input, ctx.prisma);
    }),
});
