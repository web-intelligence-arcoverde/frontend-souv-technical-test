"use client";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: any;
	className?: string;
	wrapperClassName?: string;
	isCurrency?: boolean;
	error?: string;
}

export const InputWithLabel = ({
	label,
	control,
	name,
	className,
	wrapperClassName,
	isCurrency,
	error,
	...props
}: InputProps) => {
	const formatCurrency = (value: number | string) => {
		if (value === undefined || value === null || value === "") return "";

		const amount =
			typeof value === "number" ? value : parseCurrency(String(value));

		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(amount);
	};

	const parseCurrency = (value: string) => {
		const digits = value.replace(/\D/g, "");
		if (!digits) return 0;
		return parseInt(digits, 10) / 100;
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => {
				const displayValue = isCurrency ? formatCurrency(value) : (value ?? "");

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
							<Input
								className={cn(
									"bg-surface-container-low w-full h-14 rounded-xl border transition-all text-on-surface font-bold text-sm placeholder:text-on-surface-variant/30",
									"focus-visible:ring-2 focus-visible:ring-offset-0",
									error
										? "border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/20"
										: "border-white/5 focus-visible:border-primary/50 focus-visible:ring-primary/20",
									isCurrency && "pl-3 tracking-wider",
									className,
								)}
								id={name}
								name={name}
								type={isCurrency ? "text" : props.type}
								inputMode={isCurrency ? "numeric" : props.inputMode}
								onChange={(e) => {
									if (isCurrency) {
										const rawValue = e.target.value;
										onChange(parseCurrency(rawValue));
									} else {
										onChange(e.target.value);
									}
								}}
								value={displayValue}
								{...props}
							/>
						</div>
					</div>
				);
			}}
		/>
	);
};
