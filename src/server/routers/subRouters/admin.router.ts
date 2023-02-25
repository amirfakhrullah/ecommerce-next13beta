import { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import { createProductInputSchema } from "../../../helpers/validations/productRoutesSchema";
import { paginatedInputSchema } from "../../../helpers/validations/userRoutesSchema";
import { fetchPaginatedProducts } from "../../handlers/products/fetchPaginatedProducts";
import { adminProcedure } from "../../procedures";
import { router } from "../../trpc";

export enum Sort {
  Desc = "Desc",
  Asc = "Asc",
  PriceUp = "PriceUp",
  PriceDown = "PriceDown",
}

export const adminRouter = router({
  getProductsInfo: adminProcedure
    .input(
      paginatedInputSchema.extend({
        sort: z.nativeEnum(Sort),
      })
    )
    .query(async ({ ctx, input }) => {
      const { take, cursor, sort } = input;
      const products = await fetchPaginatedProducts(
        ctx.prisma,
        sort,
        take,
        cursor
      );
      return {
        products,
        cursor: products[take - 1]?.id,
      };
    }),
  createProduct: adminProcedure
    .input(createProductInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.product.create({
        data: input,
      });
    }),
  updateProduct: adminProcedure
    .input(
      createProductInputSchema.extend({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      return ctx.prisma.product.update({
        where: {
          id,
        },
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
      });
    }),
  deleteProduct: adminProcedure.input(
    z.object({
      id: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    return ctx.prisma.product.update({
      where: {
        id: input.id
      },
      data: {
        deleted: true,
        updatedAt: new Date()
      }
    })
  }),
});

type AdminRouterOutput = inferRouterOutputs<typeof adminRouter>;
export type ProductsInfoResponse = AdminRouterOutput["getProductsInfo"];
export type CreateProductResponse = AdminRouterOutput["createProduct"];
export type UpdateProductResponse = AdminRouterOutput["updateProduct"];
export type DeleteProductResponse = AdminRouterOutput["deleteProduct"];
