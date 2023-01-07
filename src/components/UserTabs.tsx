"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { userTabs } from "../constants";
import cn from "../helpers/cn";

const UserTabs = () => {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="sm:border-t-0 border-t border-b border-zinc-300 sm:px-0 px-1">
      <div
        className={cn(
          "grid gap-1 md:w-[60%] w-full",
          `grid-cols-4`
        )}
      >
        {userTabs.map(({ href, label }) => (
          <div
            key={label}
            onClick={() => router.push(href)}
            className={cn(
              "col-span-1 sm:p-3 p-1 flex flex-row items-center justify-center cursor-pointer border-b border-gray-100 ease-in duration-100",
              href === path && "border-red-800"
            )}
          >
            <p
              className={cn(
                "text-[14px] text-center",
                href === path && "text-zinc-900"
              )}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTabs;
