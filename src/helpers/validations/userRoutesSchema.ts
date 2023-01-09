import { z } from "zod";

export const orderHistoryInputSchema = z.object({
  take: z.number(),
  cursor: z.string().optional(),
});
