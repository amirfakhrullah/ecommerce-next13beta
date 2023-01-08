"use client";

import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import cn from "../../helpers/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
  localLoaderOnClick?: boolean; // default to true
  disabled?: boolean;
  children: React.ReactNode;
  color?: "primary" | "secondary" | "red";
}

const Button = ({
  onClick,
  className = "",
  isLoading = false,
  localLoaderOnClick = true,
  disabled = false,
  children,
  color,
  ...props
}: ButtonProps) => {
  const [localLoading, setLocalLoading] = useState(false);

  const loadStatus = isLoading || (localLoaderOnClick && localLoading);

  const baseClassName =
    "rounded-md ease-in duration-100 flex flex-row items-center justify-center text-[14px]";
  const primaryClassName = cn(
    baseClassName,
    "bg-zinc-700 hover:bg-zinc-900 text-gray-100",
    loadStatus || (disabled && "bg-zinc-900 cursor-not-allowed")
  );
  const secondaryClassName = cn(
    baseClassName,
    "border border-zinc-300 hover:bg-zinc-200 text-zinc-600",
    loadStatus || (disabled && "bg-zinc-200 cursor-not-allowed")
  );
  const redClassName = cn(
    baseClassName,
    "bg-red-800 hover:bg-red-900 text-gray-100",
    loadStatus || (disabled && "bg-red-900 cursor-not-allowed")
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled || loadStatus) return;
    setLocalLoading(true);
    if (onClick) {
      return onClick(e);
    }
  };

  return (
    <button
      className={cn(
        disabled && "cursor-not-allowed",
        color === "primary"
          ? primaryClassName
          : color === "secondary"
          ? secondaryClassName
          : color === "red" && redClassName,
        className
      )}
      disabled={disabled || loadStatus}
      onClick={handleClick}
      {...props}
    >
      {loadStatus ? <FiLoader className="m-1" /> : <>{children}</>}
    </button>
  );
};

export default Button;
