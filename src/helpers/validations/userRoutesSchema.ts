import { z } from "zod";

export const paginatedInputSchema = z.object({
  take: z.number(),
  cursor: z.string().optional(),
});