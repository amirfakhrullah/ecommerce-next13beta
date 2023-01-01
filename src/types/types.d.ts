import { Product } from "@prisma/client";

export interface ProductClient extends Omit<Product, "sizes"> {
  sizes: string[];
  category: Category;
  _count: {
    orderItems: number;
  };
}
