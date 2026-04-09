import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-primary-container text-on-primary-container border-transparent",
        secondary:
          "bg-secondary-container text-on-secondary-container border-transparent",
        tertiary:
          "bg-tertiary-container text-on-tertiary-container border-transparent",
        error:
          "bg-error-container text-on-error-container border-transparent",
        outline:
          "text-on-surface border border-outline-variant/30",
        premium:
          "bg-white/5 text-primary border border-primary/20 backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export { Badge, badgeVariants };
