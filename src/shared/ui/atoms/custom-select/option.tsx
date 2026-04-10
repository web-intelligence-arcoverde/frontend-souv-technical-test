import { components } from "react-select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Option = (props: any) => {
	return (
		<components.Option {...props}>
			<div className="flex items-center gap-2">
				{props.data.icon}
				<span className="text-white">{props.data.label}</span>
			</div>
		</components.Option>
	);
};
