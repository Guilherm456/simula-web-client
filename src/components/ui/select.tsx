"use client";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@utils/utils";
import { v4 } from "uuid";

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
    label?: string;
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
    id?: string;
    className?: string;
  }
>(
  (
    {
      label,
      placeholder,
      error,
      errorMessage,
      id = `select-${v4()}`,
      className,
      ...props
    },
    ref,
  ) => (
    <div className={cn("flex flex-col gap-2")}>
      {label && (
        <label className={cn("text-sm font-medium text-gray-700")} htmlFor={id}>
          {label}
        </label>
      )}
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          className={cn(
            error
              ? "border border-solid border-[#D92D20]"
              : `border border-solid border-gray-4`,
            "px-3 py-2",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "flex h-10 w-full items-center justify-between rounded-md text-base ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            className,
          )}
          id={id}
          ref={ref}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-900 shadow-md",
              "focus:outline-none",
            )}
          >
            <SelectPrimitive.ScrollUpButton />
            <SelectPrimitive.Viewport className="p-1">
              {props.children}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton />
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && errorMessage && (
        <div className="text-sm text-red-600">{errorMessage}</div>
      )}
    </div>
  ),
);
Select.displayName = "SelectField";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-base outline-none focus:bg-blue-500 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

export { Select, SelectItem };
