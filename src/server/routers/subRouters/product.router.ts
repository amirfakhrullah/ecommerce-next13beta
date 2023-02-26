import { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import { PRODUCTS_PER_PAGE } from "../../../constants";
import {
  getCartProductsInputSchema,
  searchProductsSchema,
} from "../../../helpers/validations/productRoutesSchema";
import { fetchProductById } from "../../handlers/products/fetchProductById";
import { getCartProducts } from "../../handlers/products/getCartProducts";
import { getProductsBySearch } from "../../handlers/products/getProductsBySearch";
import { procedure, router } from "../../trpc";

export const productRouter = router({
  get: procedure
    .input(z.string().optional())
    .query(async ({ ctx, input: id }) => {
      if (!id) return;
      return fetchProductById(id, ctx.prisma);
    }),
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

type ProductRouterOutput = inferRouterOutputs<typeof productRouter>;
export type GetProduct = ProductRouterOutput["get"];
