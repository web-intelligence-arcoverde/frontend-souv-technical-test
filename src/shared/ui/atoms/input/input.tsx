import type React from "react";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, error, ...props }, ref) => {
		return (
			<input
				ref={ref}
				className={`w-full bg-surface-container-highest border-none rounded-lg py-3.5 pr-4 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 transition-all duration-300 outline-none ${
					error ? "ring-1 ring-error/50" : ""
				} ${className}`}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";
