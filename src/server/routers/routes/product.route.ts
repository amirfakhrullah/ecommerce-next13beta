import { PRODUCTS_PER_PAGE } from "../../../constants";
import {
  getCartProductsInputSchema,
  searchProductsSchema,
} from "../../../helpers/validations/productRoutesSchema";
import { getCartProducts } from "../../handlers/products/getCartProducts";
import { getProductsBySearch } from "../../handlers/products/getProductsBySearch";
import { procedure } from "../../trpc";

export const productRoutes = {
  searchProducts: procedure
    .input(searchProductsSchema)
    .query(async ({ ctx, input }) => {
      const { search, page } = input;
      if (!search) return [];
      return await getProductsBySearch(
        search,
        PRODUCTS_PER_PAGE,
        (page - 1) * PRODUCTS_PER_PAGE,
        ctx.prisma
      );
    }),
  getCartProducts: procedure
    .input(getCartProductsInputSchema)
    .query(async ({ ctx, input }) => {
      return await getCartProducts(input, ctx.prisma);
    }),
};
