import { ComponentProps, FC } from "react";

import { cn } from "@utils/utils";
import { Spinner } from ".";

type ButtonProps = {
  loading?: boolean;
} & ComponentProps<"button">;

export const Button: FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  disabled,
  loading,
  ...props
}) => {
  return (
    <button
      className={cn(
        "relative",
        "flex items-center justify-center",
        "disabled:pointer-events-none disabled:opacity-50",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "text-body font-medium uppercase",
        "text-white",
        "h-9 w-full",
        "px-4 py-2",
        "bg-primary",
        "rounded-md",
        "gap-2",
        className,
      )}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      <div className="absolute left-0 top-0 h-full w-full rounded-[inherit] opacity-10 transition-all duration-200 ease-in-out hover:bg-[#000]"></div>
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  );
};
