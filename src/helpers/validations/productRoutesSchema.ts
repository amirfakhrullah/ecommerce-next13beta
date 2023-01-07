import { z } from "zod";
import { LIMIT_SEARCH_INPUT } from "../../constants";

export const searchProductsSchema = z.object({
  search: z.string().max(LIMIT_SEARCH_INPUT),
  page: z.number(),
});
