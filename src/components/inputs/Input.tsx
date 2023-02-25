import React from "react";
import { type FieldError } from "react-hook-form";
import cn from "../../helpers/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: FieldError;
}

const Input = ({ title, required, className, error, ...props }: InputProps) => {
  return (
    <div className="my-1">
      <div className="flex flex-row mb-1">
        <p className="font-bold text-sm text-gray-700">{title}</p>
        {required && <p className="text-red-400 ml-1">*</p>}
      </div>
      <input
        className={cn(
          "py-1 px-2 text-gray-700 border border-gray-400 rounded-sm w-full bg-transparent",
          className
        )}
        {...props}
      />
      <p className="text-sm font-bold text-red-400 mt-1 text-right">
        {error && error.message}
      </p>
    </div>
  );
};

export default Input;
