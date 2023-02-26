import React from "react";
import { UseFormRegisterReturn, type FieldError } from "react-hook-form";
import cn from "../../helpers/cn";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  title: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  textArea?: boolean;
}

const Input = ({
  title,
  register,
  required,
  className,
  error,
  textArea,
  ...props
}: InputProps) => {
  return (
    <div className="mt-2">
      <div className="flex flex-row">
        <p className="font-bold text-sm text-gray-700">{title}</p>
        {required && <p className="text-red-400 ml-1">*</p>}
      </div>
      {!textArea ? (
        <input
          className={cn(
            "py-1 px-2 text-gray-700 border border-gray-400 rounded-sm w-full bg-transparent",
            className
          )}
          {...register}
          {...props}
        />
      ) : (
        <textarea
          className={cn(
            "py-1 px-2 text-gray-700 border border-gray-400 rounded-sm w-full bg-transparent",
            className
          )}
          rows={4}
          {...register}
          {...props}
        />
      )}
      <p className="text-sm font-bold text-red-400 mt-1 text-right">
        {error && error.message}
      </p>
    </div>
  );
};

export default Input;
