import { useQuery } from "@tanstack/react-query";
import { ShoppingListService } from "@/services/shopping-list";

export const useGetPublicShoppingList = (id: string) => {
	return useQuery({
		queryKey: ["public-shopping-list", id],
		queryFn: () => ShoppingListService.getPublicShoppingListById(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};
