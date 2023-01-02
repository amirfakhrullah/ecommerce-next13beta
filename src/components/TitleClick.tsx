"use client";

import { useRouter } from "next/navigation";
import React from "react";
import cn from "../helpers/cn";

interface TitleClickProps extends React.HTMLAttributes<HTMLDivElement> {
  route: string;
}

const TitleClick = ({
  route,
  children,
  className = "",
  ...props
}: TitleClickProps) => {
  const router = useRouter();

  return (
    <div
      {...props}
      className={cn("cursor-pointer", className)}
      onClick={() => router.push(route)}
    >
      {children}
    </div>
  );
};

export default TitleClick;
