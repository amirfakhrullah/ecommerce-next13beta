"use client";

import { useRouter } from "next/navigation";
import React from "react";

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
      className={`${className} cursor-pointer`}
      onClick={() => router.push(route)}
    >
      {children}
    </div>
  );
};

export default TitleClick;
