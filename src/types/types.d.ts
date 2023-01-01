import { Product } from "@prisma/client";

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

export interface CartItem {
  id: string;
  name: string;
  image: string;
  size: string;
}
