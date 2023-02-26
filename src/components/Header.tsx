"use client";

import CheckoutBtn from "./menus/CartMenu";
import AuthButton from "./buttons/AuthButton";
import TitleClick from "./TitleClick";
import SearchSection from "./sections/SearchSection/SearchSection";
import { usePathname, useRouter } from "next/navigation";
import cn from "../helpers/cn";
import { useUserContext } from "../providers/UserProvider";

const Header = () => {
  const { isAdmin } = useUserContext();
  const path = usePathname();
  const router = useRouter();

  const isInPath = (route: string) => path === route;

  const adminSection = isAdmin && !!path?.startsWith("/admin");

  return (
    <div className="sticky top-0 bg-gray-100 mx-1 px-2 py-3 border-b border-zinc-300 flex flex-row items-center justify-between z-[1]">
      <div className="flex flex-row items-center gap-5">
        <TitleClick className="text-2xl text-red-800 font-black" route="/">
          Checks!
        </TitleClick>
        {!adminSection ? (
          <SearchSection />
        ) : (
          <div className="flex flex-row items-center gap-2">
            <p
              className={cn(
                "text-[16px] font-bold cursor-pointer hover:underline hover:text-red-800",
                isInPath("/admin") && "text-red-800"
              )}
              onClick={() => router.push("/admin")}
            >
              Orders
            </p>
            <p
              className={cn(
                "text-[16px] font-bold cursor-pointer hover:underline hover:text-red-800",
                isInPath("/admin/products") && "text-red-800"
              )}
              onClick={() => router.push("/admin/products")}
            >
              Products
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-center">
        <AuthButton />
        <div className="m-1" />
        {!adminSection && <CheckoutBtn />}
      </div>
    </div>
  );
};

export default Header;
