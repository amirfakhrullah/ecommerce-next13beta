"use client";

import { toast } from "react-hot-toast";
import { useCartContext } from "../../providers/CartContextProvider";
import { trpc } from "../../providers/trpcProvider";
import Loader from "../Loader";
import { CartItem } from "../../types/types";
import CartCard from "../cards/CartCard";
import NotFoundText from "../NotFoundText";
import { useMemo, useState } from "react";
import Button from "../buttons/Button";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface ProductMap {
  [key: string]: {
    sizes: string[];
    price: number;
  };
}
const CartSection = () => {
  const { cartItems, setCartItems } = useCartContext();
  const [productsMap, setProductsMap] = useState<ProductMap>({});

  const router = useRouter();

  const { isLoading, isRefetching } = trpc.getCartProducts.useQuery(
    cartItems.map((item) => ({
      id: item.id,
      size: item.size,
    })),
    {
      refetchOnWindowFocus: false,
      onError: (err) => toast.error(err.message),
      onSuccess: (data) => {
        const uniqueProducts = new Map<
          string,
          {
            sizes: string[];
            price: number;
          }
        >();
        data.forEach((item) => {
          uniqueProducts.set(item.id, {
            price: item.price,
            sizes: item.sizes,
          });
        });
        setProductsMap(Object.fromEntries(uniqueProducts));

        if (data.length !== cartItems.length) {
          const updatedCarts: CartItem[] = [];
          const unAvailableProducts: CartItem[] = [];
          cartItems.forEach((item) => {
            if (uniqueProducts.get(item.id)?.sizes.includes(item.size)) {
              updatedCarts.push(item);
            } else {
              unAvailableProducts.push(item);
            }
          });
          setCartItems(updatedCarts);
          if (unAvailableProducts.length > 0) {
            toast.error(
              `${unAvailableProducts
                .map((item) => `${item.name}, size US M ${item.size}`)
                .join(", ")} ${
                unAvailableProducts.length === 1 ? "is" : "are"
              } not available`
            );
          }
        }
      },
    }
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (acc, curr) => acc + (productsMap[curr.id]?.price ?? 0),
        0
      ),
    [cartItems, productsMap]
  );

  if (isLoading || isRefetching) return <Loader />;

  return (
    <div className="mx-auto max-w-4xl w-full py-4 sm:px-0 px-2">
      <h2 className="text-2xl font-black mb-4">
        Your Cart ({cartItems.length}):
      </h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, idx) =>
            productsMap[item.id]?.price ? (
              <CartCard
                index={idx}
                key={item.id + idx}
                item={item}
                price={productsMap[item.id].price}
              />
            ) : (
              <div key={item.id + idx} />
            )
          )}
          <div className="w-full flex flex-col items-end my-10">
            <p className="font-medium mb-2">Your Total</p>
            <h2 className="text-4xl font-black mb-4">${totalPrice}</h2>
            <div className="flex flex-row items-center gap-2">
              <Button
                onClick={() => router.push("/products")}
                color="secondary"
                className="px-6 py-3"
              >
                Continue Shopping
              </Button>

              <Button
                onClick={() =>
                  toast.success("The checkout system is in development!")
                }
                color="primary"
                className="px-6 py-3"
                localLoaderOnClick={false}
              >
                Checkout
                <IoArrowForwardOutline className="text-xl ml-2" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <NotFoundText>No Items.</NotFoundText>
      )}
    </div>
  );
};

export default CartSection;