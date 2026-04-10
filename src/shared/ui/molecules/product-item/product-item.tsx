import React, { useContext } from "react";
import { ShoppingListContext } from "@/app/providers/shopping-list-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CategoryTag } from "../category-tag/category-tag";
import { ActionMenuProduct } from "./action-menu-product";

export interface ItemProps {
	category: string;
	name: string;
	quantity: number;
	unit: string;
	id: string;
	checked: boolean;
	isReadOnly?: boolean;
}

export const ProductItem = ({
	category,
	name,
	quantity,
	unit,
	id,
	checked,
	isReadOnly = false,
}: ItemProps) => {
	const context = useContext(ShoppingListContext);

	const handleToggle = () => {
		if (!isReadOnly && context) {
			context.toggleItemChecked(id);
		}
	};

	return (
		<div
			className={cn(
				"bg-surface-container-low w-full md:w-full p-6 items-center rounded-2xl flex flex-row justify-between border border-white/5 transition-all duration-500 hover:bg-surface-container-high group",
				checked && "opacity-40 grayscale-[50%]",
			)}
		>
			<div className="flex flex-row items-center flex-1">
				<Checkbox
					checked={checked}
					onCheckedChange={handleToggle}
					disabled={isReadOnly}
					className="w-5 h-5 border-2 border-outline-variant/30 rounded-lg data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-300"
				/>
				<div className="flex flex-col ml-6">
					<h4
						className={cn(
							"text-lg font-bold text-on-surface tracking-tight transition-all duration-500",
							checked && "line-through opacity-50",
						)}
					>
						{name}
					</h4>
					<p className="text-on-surface-variant/60 text-[11px] font-black uppercase tracking-[0.2em] mt-1">
						{quantity} {unit}
					</p>
				</div>
			</div>
			<div className="flex flex-row items-center gap-6">
				<CategoryTag category={category} />
				{!isReadOnly && <ActionMenuProduct id={id} />}
			</div>
		</div>
	);
};
