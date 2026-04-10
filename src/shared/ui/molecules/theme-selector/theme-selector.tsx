"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ThemeOption {
	id: string;
	label: string;
	icon: string;
	color?: string;
}

interface ThemeSelectorProps {
	label: string;
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: any;
	options: ThemeOption[];
	error?: string;
	className?: string;
}

export const ThemeSelector = ({
	label,
	name,
	control,
	options,
	error,
	className,
}: ThemeSelectorProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<div className={cn("flex flex-col gap-4 w-full group", className)}>
					<div className="flex justify-between items-center px-1">
						<Label
							className={cn(
								"text-[10px] font-black uppercase tracking-[0.2em] transition-colors group-focus-within:text-primary",
								error ? "text-red-400" : "text-on-surface-variant/70",
							)}
						>
							{label}
						</Label>
						{error && (
							<span className="text-[9px] font-bold text-red-400 uppercase tracking-wider animate-in fade-in">
								{error}
							</span>
						)}
					</div>

					<div className="flex flex-wrap gap-2.5">
						{options.map((option) => (
							<button
								key={option.id}
								type="button"
								onClick={() => onChange(option.id)}
								className={cn(
									"flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all active:scale-95 border-2",
									value === option.id
										? "bg-primary text-on-primary border-primary shadow-[0_0_20px_rgba(204,151,255,0.2)]"
										: "bg-surface-container-highest text-on-surface-variant border-transparent hover:border-white/10",
								)}
							>
								<span
									className={cn(
										"material-symbols-outlined text-[18px]",
										value === option.id ? "fill-1" : "",
									)}
									style={
										value === option.id
											? { fontVariationSettings: "'FILL' 1" }
											: {}
									}
								>
									{option.icon}
								</span>
								<span className="text-[11px] font-bold tracking-tight uppercase">
									{option.label}
								</span>
							</button>
						))}
					</div>
				</div>
			)}
		/>
	);
};
