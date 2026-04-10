"use client";

import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: any;
	className?: string;
	wrapperClassName?: string;
	error?: string;
}

export const TextareaWithLabel = ({
	label,
	control,
	name,
	className,
	wrapperClassName,
	error,
	...props
}: TextareaProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => {
				return (
					<div
						className={cn(
							"flex flex-col w-full items-start gap-2 transition-all group",
							error
								? "animate-in fade-in slide-in-from-top-1 duration-300"
								: "",
							wrapperClassName,
						)}
					>
						<div className="flex justify-between w-full items-center px-1">
							<Label
								htmlFor={name}
								className={cn(
									"text-[10px] font-black uppercase tracking-[0.2em] transition-colors group-focus-within:text-primary",
									error ? "text-red-400" : "text-on-surface-variant/60",
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
						<div className="relative w-full">
							<Textarea
								className={cn(
									"bg-surface-container-low w-full min-h-32 rounded-xl border transition-all text-on-surface font-bold text-sm placeholder:text-on-surface-variant/30",
									"focus-visible:ring-2 focus-visible:ring-offset-0 transition-all resize-none",
									error
										? "border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/20"
										: "border-white/5 focus-visible:border-primary/50 focus-visible:ring-primary/20",
									className,
								)}
								id={name}
								name={name}
								onChange={onChange}
								value={value ?? ""}
								{...props}
							/>
						</div>
					</div>
				);
			}}
		/>
	);
};
