import React from "react";
import { cn } from "@/lib/utils";

interface AvatarStackProps {
	images: string[];
	remainingCount?: number;
	size?: "sm" | "md";
	className?: string;
}

export const AvatarStack = ({
	images,
	remainingCount,
	size = "sm",
	className,
}: AvatarStackProps) => {
	const sizeClasses = {
		sm: "w-8 h-8",
		md: "w-10 h-10",
	};

	return (
		<div className={cn("flex -space-x-2.5", className)}>
			{images.slice(0, 3).map((src, i) => (
				<div
					key={i}
					className={cn(
						"rounded-full border-2 border-surface-container-low overflow-hidden bg-surface-container-highest",
						sizeClasses[size],
					)}
				>
					<img
						src={src}
						alt="Item preview"
						className="w-full h-full object-cover"
					/>
				</div>
			))}
			{remainingCount && remainingCount > 0 && (
				<div
					className={cn(
						"rounded-full border-2 border-surface-container-low bg-surface-container-highest flex items-center justify-center text-on-surface-variant",
						sizeClasses[size],
					)}
				>
					<span className="text-[10px] font-black tracking-tighter">
						+{remainingCount}
					</span>
				</div>
			)}
		</div>
	);
};
