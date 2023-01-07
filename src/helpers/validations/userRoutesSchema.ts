import { z } from "zod";

export const userIdSchema = z.object({
  id: z.string().max(30),
});

export const orderHistoryInputSchema = z.object({
  userId: z.string().max(30),
  skip: z.number().optional(),
  take: z.number(),
});
