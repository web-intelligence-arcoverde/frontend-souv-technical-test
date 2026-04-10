import type React from "react";
import { useId, useState } from "react";
import Select, {
	type ActionMeta,
	type ClassNamesConfig,
	type MultiValue,
	type SingleValue,
} from "react-select";
import { Label } from "@/components/ui/label";
import { DropdownIndicator } from "./dropdown-indicator";
import { Option } from "./option";

type Option = {
	value: string;
	label: string;
	icon?: React.ReactNode;
};

type CustomSelectProps = {
	label: string;
	options: Option[];
	placeholder?: string;
	defaultValue?: Option;
	onChange: (
		newValue: MultiValue<Option> | SingleValue<Option>,
		actionMeta: ActionMeta<Option>,
	) => void;
	className?: string;
	classeNames?: ClassNamesConfig<Option>;
};

export const CustomSelect = ({
	label,
	options,
	placeholder = "Selecione",
	defaultValue,
	onChange,
	className = "",
	classeNames,
}: CustomSelectProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const id = useId();

	return (
		<div className={`group w-full flex flex-col gap-2 ${className}`}>
			<Label className="text-white">{label}</Label>
			<div className="h-10">
				<Select
					unstyled
					instanceId={id}
					options={options}
					defaultValue={defaultValue}
					placeholder={placeholder}
					onChange={onChange}
					classNames={{
						control: () =>
							"bg-gray-400 text-gray-200 tracking-[0.42px] flex items-center justify-between h-full px-3 rounded-md text-xs border border-gray-300 focus-within:border-purple-light",
						container: () => "h-full",
						dropdownIndicator: () =>
							`${isMenuOpen ? "rotate-180 text-purple-light" : "rotate-0"}`,
						option: () =>
							"p-3 bg-gray-500 text-sm tracking-[0.42px] hover:bg-gray-300",
						menuList: () =>
							"divide-y-[1px] divide-gray-300 border border-gray-300 rounded-md mt-1",
						...classeNames,
					}}
					components={{ DropdownIndicator, Option }}
					onMenuOpen={() => setIsMenuOpen(true)}
					onMenuClose={() => setIsMenuOpen(false)}
				/>
			</div>
		</div>
	);
};
