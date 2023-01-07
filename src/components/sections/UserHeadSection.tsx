"use client";

import { notFound } from "next/navigation";
import cn from "../../helpers/cn";
import { useUserContext } from "../../providers/UserProvider";
import UserAvatar from "../Avatar";

const UserHeadSection = () => {
  const { user } = useUserContext();

  if (!user) {
    return notFound();
  }
  return (
    <div className="bg-gradient-to-b from-zinc-200 border-t border-x border-zinc-300 pt-14 pb-4 sm:pl-10 pl-4 mt-4 rounded-t-2xl">
      <div
        className={cn(
          "mb-3 rounded-full h-20 w-20 flex flex-row items-center justify-center overflow-hidden",
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
      <p className="text-lg font-medium">{user.name}</p>
      <p className="text-[14px]">{user.email}</p>
    </div>
  );
};

export default UserHeadSection;
