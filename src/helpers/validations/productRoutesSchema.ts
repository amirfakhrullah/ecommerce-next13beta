import { Prisma } from "@prisma/client";
import { z } from "zod";
import { LIMIT_SEARCH_INPUT } from "../../constants";

export const searchProductsSchema = z.object({
  search: z.string().max(LIMIT_SEARCH_INPUT),
  page: z.number(),
});

export const getCartProductsInputSchema = z
  .array(
    z.object({
      id: z.string().max(30),
      size: z
        .string()
        .max(5)
        .transform((val) => new Prisma.Decimal(val)),
    })
  )
  .max(5);

export type CartProductsInput = z.infer<typeof getCartProductsInputSchema>;
