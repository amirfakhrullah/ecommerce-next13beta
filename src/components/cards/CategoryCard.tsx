import { Category } from "@prisma/client";
import Image from "next/image";
import React from "react";

export const CategoryCard = ({ id, name, image }: Category) => {
  return (
    <div className="cursor-pointer sm:p-5 p-2 border border-zinc-300 hover:border-zinc-500 ease-in duration-150 overflow-hidden">
      <div className="mb-10 flex flex-row items-center justify-center">
        <Image blurDataURL="blur" src={`${image}?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaDmFwLXNvdXRoZWFzdC0xIkgwRgIhAJ0v3aeP5eiXXGid7rUkLKkB9ymkw36sRE2YmEis8qyAAiEAmumpMXJlrytDv53zKk3s7eJMYj0Yv%2FpJ1bOllAbtx6Yq7QIIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw4MTA1MzE4NjgzNjciDEBLnUSffSf8AIr%2BlirBAiDWLs3Vzq3nbWI5%2FSe0e%2FDoxrbmk640S18Svd0o0tJrcA7e%2BQ8Wx3H7WmFuXeqtDFaKQwYmhBXWBslT5D0WuLAjaEN4l18d6t3I6H77cM6jtzgvtB6Hp0%2F8BjVGX4fjz79kdcC8UEIg%2FSx39FkevW9uHdMdNVMb9pR4zvboHyeYBsCEetI3sGSzHMnEWx2C60vRxKi1N2fFhgPppzBzuOjQpzsCic%2BikN9f5CbwfdOpwYEwpzudsyUkF9y4cSs3cQtpaygtfIKnw5H5L89uayosutVvRK0ftG3fjV23ItjLlaTGIqt91D9JyPR9LItsCTjj2Jimihnv1rJOS5clXxWE2Uj2%2BYimxqPGTWkza7%2B3B1lTiYtgM9x0T5kqNx5GSMCff4a5%2FYx1FFWjQMZeIpVvVx8gdBEe5rNsvh8H76VsjjDvycSdBjqyAhbFqFPwWQOVxq0NG%2BwrMSjIGleQvbmlHTA7L%2FzTUDcr0bo3T5Wn8inaYQe6tNzS7hYL9LsNuZml%2FgVC4%2BQPIvrg5YGEHFYa2pr11elYx8%2BihDo2dcNHH6as4y6hz6ehyfXMzEr4AXGhl4qF0%2FYn1ez80mJAFNXdnqvPdJX%2BfiLrg2pK5f4Kvp4a8vt7%2BQPS06N3LxyiiqGkecANzr2Fk3KRz6%2FlmsdXrkXMncpndOE2kTPnYJpcBwouqhW6B86ovBqe465BBm%2Bzwp6WQ2wQRLC2zdyC0p8YGVK%2FZEfsLak%2FNiWFaoF4ynRXXzZARY0w77eohh16jYpVIySjBtKspY0O9PoRF9%2Fa9bBglsGw4Lmhlx0w1w%2FR53%2Bbn%2BXSxBEYH0g9JRmlITRBxe98sJbLo569gA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230101T065440Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3ZN3WZ3HQGJNGF4T%2F20230101%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=124cce9fe94645dc5572b6fd2770993e9a7faf151126c1089a63c286f468ab8f`} alt={id} width={300} height={300} />
      </div>
      <h3 className="text-2xl font-black text-center">{name}</h3>
    </div>
  );
};
