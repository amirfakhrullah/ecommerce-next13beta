import { z } from "zod";

export const orderHistoryInputSchema = z.object({
  skip: z.number().optional(),
  take: z.number(),
});
