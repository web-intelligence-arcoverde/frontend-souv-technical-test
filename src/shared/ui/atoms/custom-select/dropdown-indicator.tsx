import { ChevronDown } from "lucide-react";
import { components } from "react-select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DropdownIndicator = (props: any) => {
	return (
		<components.DropdownIndicator {...props}>
			<ChevronDown size={16} />
		</components.DropdownIndicator>
	);
};
