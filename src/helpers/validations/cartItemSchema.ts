import { z } from "zod";

export const cartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  size: z.string(),
});

export const cartsSchema = z.array(cartItemSchema)
