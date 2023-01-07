import { FullProduct, FullProductClient } from "../types/types";

export const massageProductClient = (
  product: FullProduct
): FullProductClient => ({
  ...product,
  // decimal cannot be rendered on the client side later on, so we convert it to string
  sizes: product.sizes.map((size) => size.toString()),
  createdAt: product.createdAt.toUTCString(),
  updatedAt: product.updatedAt?.toUTCString(),
});

export const massageProductClientList = (
  products: FullProduct[]
): FullProductClient[] =>
  products.map((product) => massageProductClient(product));
