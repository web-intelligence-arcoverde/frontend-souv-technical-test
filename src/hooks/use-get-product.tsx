"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/product";

export const useGetProducts = (page: number, limit: number) => {
	return useQuery({
		queryKey: ["products", page, limit],
		queryFn: () => ProductService.getProducts(page, limit),
	});
};
