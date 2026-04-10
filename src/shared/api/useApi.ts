import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

interface ApiError {
	message: string;
	status: number;
}

interface UseApiOptions<T>
	extends Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn"> {
	enabled?: boolean;
}

export const useApi = <T>(
	key: string[],
	fetchFn: () => Promise<T>,
	options: UseApiOptions<T> = {},
) => {
	return useQuery<T, ApiError>({
		queryKey: key,
		queryFn: fetchFn,
		...options,
	});
};
