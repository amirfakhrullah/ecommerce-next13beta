"use client";

import React from "react";
import { userTabs } from "../constants";
import cn from "../helpers/cn";

interface UserTabsProps {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}
const UserTabs = ({ tab, setTab }: UserTabsProps) => {
  return (
    <div className="border border-zinc-300 sm:px-0 px-1">
      <div className={cn("grid gap-1 md:w-[50%] w-full grid-cols-2")}>
        {userTabs.map(({ label }, idx) => (
          <div
            key={label}
            onClick={() => setTab(idx)}
            className={cn(
              "col-span-1 sm:p-3 p-2 flex flex-row items-center justify-center cursor-pointer border-b border-gray-100 ease-in duration-100",
              idx === tab && "border-red-800"
            )}
          >
            <p
              className={cn(
                "text-[14px] text-center",
                idx === tab && "text-zinc-900"
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
