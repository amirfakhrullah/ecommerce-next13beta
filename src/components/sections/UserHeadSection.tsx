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
    <div className="mx-2 mb-4 sm:mt-6 mt-4 flex flex-row items-center">
      <div
        className={cn(
          "cursor-pointer rounded-full h-14 w-14 flex flex-row items-center justify-center overflow-hidden",
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
      <div className="sm:ml-5 ml-2">
        <p className="text-[14px] font-medium">{user.name}</p>
        <p className="text-[14px]">{user.email}</p>
      </div>
    </div>
  );
};

export default UserHeadSection;
