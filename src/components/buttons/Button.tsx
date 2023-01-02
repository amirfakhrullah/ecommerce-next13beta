"use client";

import React, { useState } from "react";
import { FiLoader } from "react-icons/fi";
import cn from "../../helpers/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  isLoading?: boolean;
  loaderOnClick?: boolean; // default to true
  disabled?: boolean;
  children: React.ReactNode | string | string[];
  color?: "primary" | "secondary";
}

const Button = ({
  onClick,
  className = "",
  isLoading = false,
  loaderOnClick = true,
  disabled = false,
  children,
  color,
  ...props
}: ButtonProps) => {
  const [localLoading, setLocalLoading] = useState(false);

  const loadStatus = isLoading || (loaderOnClick && localLoading);

  const baseClassName =
    "rounded-lg ease-in duration-150 flex flex-row items-center justify-center text-[14px]";
  const primaryClassName = cn(
    baseClassName,
    "bg-red-800 hover:bg-red-900 text-gray-100",
    loadStatus && "bg-red-900 cursor-not-allowed"
  );
  const secondaryClassName = cn(
    baseClassName,
    "border border-red-800 hover:bg-red-800 text-red-800 hover:text-gray-100",
    loadStatus && "bg-red-800 text-gray-100 cursor-not-allowed"
  );

  const handleClick = () => {
    if (disabled || loadStatus) return;
    setLocalLoading(true);
    onClick();
  };

  return (
    <button
      className={cn(
        className,
        disabled && "cursor-not-allowed",
        color === "primary"
          ? primaryClassName
          : color === "secondary" && secondaryClassName
      )}
      disabled={disabled || loadStatus}
      onClick={() => handleClick()}
      {...props}
    >
      {loadStatus ? <FiLoader className="m-1" /> : <>{children}</>}
    </button>
  );
};

export default Button;
