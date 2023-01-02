import { Product } from "@prisma/client";
import { z } from "zod";
import { cartItemSchema } from "../helpers/validations/zodValidations";

// product data including its category and number or orderedItems
export interface FullProduct extends Product {
  category: Category;
  _count: {
    orderItems: number;
  };
}

// FullProduct data but converting sizes types from decimal to string for the client side usage
export interface FullProductClient extends Omit<FullProduct, "sizes"> {
  sizes: string[];
}

export type CartItem = z.infer<typeof cartItemSchema>;
