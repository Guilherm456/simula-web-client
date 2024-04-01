"use client";
import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";

import { cn } from "@utils/utils";
import { v4 } from "uuid";

export type TextfieldProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
  error?: boolean;
  errorMessage?: string | ReactNode;
} & ComponentPropsWithRef<"input">;

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
  (
    {
      color = "gray-6",
      label,
      id = `textfield-${v4()}`,
      leftIcon,
      rightIcon,
      className = "gap-2",
      error,
      errorMessage,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          "flex w-full flex-col gap-2",
          disabled && "pointer-events-none opacity-50",
        )}
        aria-disabled={disabled}
      >
        {label && (
          <span className={cn("text-body font-medium text-gray-12")}>
            {label}
          </span>
        )}
        <div
          className={cn(
            error
              ? "border border-solid border-red-600"
              : `border border-solid border-gray-4`,
            "relative",
            `flex items-center text-base`,
            "rounded-md",
            "h-10",
            "px-3 py-2",
            "transition-all duration-300 ease-out hover:border-gray-12",
            "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background",
            className,
          )}
        >
          {leftIcon}
          <input
            className={cn(`peer w-full border-none outline-none`)}
            id={id}
            ref={ref}
            {...props}
            disabled={disabled}
          />
          {rightIcon}
        </div>
        {error && errorMessage && (
          <div className="text-base text-red-600">{errorMessage}</div>
        )}
      </label>
    );
  },
);
