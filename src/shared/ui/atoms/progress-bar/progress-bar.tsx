import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
	value: number; // 0 to 100
	variant?: "primary" | "secondary" | "tertiary" | "error";
	className?: string;
	showGlow?: boolean;
}

export const ProgressBar = ({
	value,
	variant = "primary",
	className,
	showGlow = true,
}: ProgressBarProps) => {
	const normalizedValue = Math.min(100, Math.max(0, value));

	const variantStyles = {
		primary: "bg-primary",
		secondary: "bg-secondary",
		tertiary: "bg-tertiary",
		error: "bg-error",
	};

	const glowStyles = {
		primary: "shadow-[0_0_12px_rgba(204,151,255,0.4)]",
		secondary: "shadow-[0_0_12px_rgba(253,196,37,0.3)]",
		tertiary: "shadow-[0_0_12px_rgba(197,255,201,0.3)]",
		error: "shadow-[0_0_12px_rgba(255,110,132,0.3)]",
	};

	return (
		<div
			className={cn(
				"w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden",
				className,
			)}
		>
			<div
				className={cn(
					"h-full rounded-full transition-all duration-700 ease-out",
					variantStyles[variant],
					showGlow && glowStyles[variant],
				)}
				style={{ width: `${normalizedValue}%` }}
			/>
		</div>
	);
};
