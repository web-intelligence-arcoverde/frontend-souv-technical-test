import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-primary/90 shadow-xl",
        destructive: "bg-error text-on-error hover:bg-error/90 shadow-xl",
        outline: "border border-outline-variant/20 bg-transparent hover:bg-surface-container-low text-on-surface",
        secondary: "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
        ghost: "hover:bg-surface-container-low text-on-surface",
        link: "text-primary underline-offset-4 hover:underline",
        "premium-gradient": "btn-gradient text-on-primary font-bold tracking-wider uppercase text-xs",
        "premium-social": "bg-surface-container-low border border-outline-variant/10 hover:bg-surface-container-high text-on-surface-variant hover:text-white",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-3 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
        full: "w-full py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined animate-spin text-lg">sync</span>
            {children}
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };