import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "w-5 h-5 rounded bg-surface-container-highest border-outline text-primary focus:ring-primary/20 ring-offset-background cursor-pointer transition-all",
          error ? "border-error/50" : "border-outline",
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
