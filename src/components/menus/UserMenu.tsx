"use client";

import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import cn from "../../helpers/cn";
import UserAvatar from "../Avatar";
import Button from "../buttons/Button";

const UserMenu = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
  };

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <div
          className={cn(
            "cursor-pointer rounded-full h-8 w-8 flex flex-row items-center justify-center overflow-hidden mr-2",
            !user.image && "bg-purple-400"
          )}
        >
          <UserAvatar
            user={user}
            fallbackProps={{
              delayMs: 600,
            }}
          />
        </div>
      </MenuHandler>
      <MenuList className="rounded-md bg-zinc-100 p-3 shadow-md mb-2">
        <p className="text-[14px] font-medium" onClick={() => signOut()}>{user.name}</p>
        <p className="text-[14px]">{user.email}</p>
        <div className="border-t border-zinc-300 my-2" />
        <Button
          color="primary"
          className="w-full py-2"
          onClick={handleSignOut}
          isLoading={isLoading}
        >
          Logout
        </Button>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
