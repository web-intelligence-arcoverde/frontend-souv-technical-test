import React, { forwardRef } from "react";
import { Input } from "../../atoms/input/input";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, icon, error, id, rightElement, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          className="block text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant px-1"
          htmlFor={id}
        >
          {label}
        </label>
        <div className="relative group">
          {icon && (
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-xl">
              {icon}
            </span>
          )}
          <Input
            ref={ref}
            id={id}
            error={!!error}
            className={`${icon ? "pl-12" : "pl-4"} ${rightElement ? "pr-12" : "pr-4"}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-[10px] text-error font-bold px-1 uppercase tracking-wider">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
