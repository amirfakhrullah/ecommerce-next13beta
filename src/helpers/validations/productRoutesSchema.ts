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

export const createProductInputSchema = z.object({
  name: z.string().min(5).max(50),
  image: z.string().min(5).max(500),
  description: z.string().max(500).optional(),
  sizes: z.array(z.string().min(1).max(10)),
  quantity: z.number().min(10),
  price: z.number().min(100),
  categoryId: z.string(),
});

export type CreateProductsInput = z.infer<typeof createProductInputSchema>;
