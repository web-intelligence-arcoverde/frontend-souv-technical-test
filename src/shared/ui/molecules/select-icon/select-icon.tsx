"use client";

import * as React from "react";
import "./style.css";

import {
	AppleIcon,
	BeefIcon,
	CarrotIcon,
	MilkIcon,
	SandwichIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const categories = [
	{
		icon: SandwichIcon,
		iconColor: "text-yellow",
		value: "padaria",
		label: "padaria",
	},
	{
		icon: CarrotIcon,
		iconColor: "text-green",
		value: "legume",
		label: "legume",
	},
	{
		icon: AppleIcon,
		iconColor: "text-orange",
		label: "fruta",
		value: "fruta",
	},
	{
		icon: MilkIcon,
		iconColor: "text-blue",
		value: "bebida",
		label: "bebida",
	},
	{
		icon: BeefIcon,
		iconColor: "text-pink",
		label: "carne",
		value: "carne",
	},
];

const SelectWithIconDemo = ({
	label,
	name,
}: {
	label: string;
	name: string;
}) => {
	const [value, setValue] = React.useState("apple");

	return (
		<div className="flex flex-col items-start gap-1.5 w-[232px] focus-within:[&>div>button>svg]:text-[#9747FF] ">
			<Label
				htmlFor={name}
				className="text-gray-200 font-family-inter text-xs font-normal transition-colors"
			>
				{label}
			</Label>
			<Select value={value} onValueChange={setValue}>
				<SelectTrigger className="bg-gray-500 h-[40px] w-full rounded-md border-gray-300 focus-visible:ring-transparent focus-visible:ring-offset-0 text-white focus-visible:border-purple-medium ">
					<SelectValue
						placeholder="Selecione a categoria"
						className="text-white placeholder-white"
					/>
				</SelectTrigger>
				<SelectContent className="bg-gray-500 border-gray-300  ">
					<SelectGroup className="bg-gray-500 [&_div:focus]:bg-gray-300 [&_div:focus]:text-white ">
						{categories.map((category) => (
							<SelectItem
								key={category.value}
								value={category.value}
								className="bg-gray-500"
							>
								<div className="flex items-center gap-2 text-white capitalize">
									<category.icon className={`h-4 w-4 ${category.iconColor}`} />{" "}
									{category.label}
								</div>
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectWithIconDemo;
