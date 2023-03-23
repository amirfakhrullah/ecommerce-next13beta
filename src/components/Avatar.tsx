"use client";

import * as Avatar from "@radix-ui/react-avatar";
import { RefAttributes } from "react";

interface UserAvatarProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  rootProps?: Avatar.AvatarProps & RefAttributes<HTMLSpanElement>;
  imageProps?: Avatar.AvatarImageProps & RefAttributes<HTMLImageElement>;
  fallbackProps?: Avatar.AvatarFallbackProps & RefAttributes<HTMLSpanElement>;
}

const UserAvatar = ({
  user,
  rootProps,
  imageProps,
  fallbackProps,
}: UserAvatarProps) => (
  <Avatar.Root {...rootProps}>
    <Avatar.Image
      src={user?.image || undefined}
      alt={user?.id}
      {...imageProps}
    />
    <Avatar.Fallback {...fallbackProps}>
      {user?.name?.[0] || user?.email?.[0] || ""}
    </Avatar.Fallback>
  </Avatar.Root>
);

export default UserAvatar;
