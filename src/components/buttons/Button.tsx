"use client";

import React from "react";
import { FiLoader } from "react-icons/fi";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode | string | string[];
  color?: "primary" | "secondary";
}

const Button = ({
  onClick,
  className = "",
  isLoading = false,
  disabled = false,
  children,
  color,
  ...props
}: ButtonProps) => {
  const baseClassName =
    "rounded-lg ease-in duration-150 flex flex-row items-center justify-center text-[14px]";
  const primaryClassName =
    baseClassName + " bg-red-800 hover:bg-red-900 text-gray-100";
  const secondaryClassName =
    baseClassName +
    " border border-red-800 hover:bg-red-800 text-red-800 hover:text-gray-100";

  return (
    <button
      className={`${className} ${
        color === "primary"
          ? primaryClassName
          : color === "secondary"
          ? secondaryClassName
          : ""
      }`}
      disabled={disabled || isLoading}
      onClick={() => !disabled && !isLoading && onClick()}
      {...props}
    >
      {isLoading ? <FiLoader className="m-1" /> : <>{children}</>}
    </button>
  );
};

export default Button;
