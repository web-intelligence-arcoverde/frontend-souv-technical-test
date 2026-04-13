"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product";

export const useGetProducts = (page: number, limit: number, listId: string) => {
	return useQuery({
		queryKey: ["products", listId, page, limit],
		queryFn: () => ProductService.getProducts(page, limit, listId),
	});
};
