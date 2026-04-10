import type React from "react";
import { useState } from "react";
import { cn } from "../../../../lib/utils";
import { Button } from "../../atoms/Button/Button";

interface SearchFormProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	initialValue?: string;
	className?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
	onSearch,
	placeholder = "Search...",
	initialValue = "",
	className,
}) => {
	const [query, setQuery] = useState(initialValue);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={cn("flex w-full max-w-sm items-center space-x-2", className)}
		>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder={placeholder}
				className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			/>
			<Button type="submit">Search</Button>
		</form>
	);
};
