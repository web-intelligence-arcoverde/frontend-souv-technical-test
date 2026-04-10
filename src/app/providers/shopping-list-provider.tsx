"use client";

import { useSearchParams } from "next/navigation";
import React, { createContext, type ReactNode, useContext } from "react";
import { useCreateProduct } from "@/hooks/use-create-product";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { useGetShoppingListDetail } from "@/hooks/use-get-shopping-list-detail";
import { useToast } from "@/hooks/use-toast";
import { useUpdateProductChecked } from "@/hooks/use-update-checked-product";
import type { ProductProps } from "@/types/product";
import type { IShoppingList } from "@/types/shopping-list";

interface Pagination {
	page: number;
	limit: number;
	data: ProductProps[];
	currentPage: number;
	totalPages: number;
}

// Define o tipo para o contexto
type ShoppingListContextType = {
	addItem: (item: Partial<ProductProps>) => void;
	deleteItem: (id: string) => void;
	toggleItemChecked: (id: string) => void;
	products: Pagination;
	list: IShoppingList | null;
	isLoading: boolean;
	isError: boolean;
	handleNextPage: () => void;
	handlePreviuesPage: () => void;
};

// Cria o contexto
export const ShoppingListContext = createContext<
	ShoppingListContextType | undefined
>(undefined);

// Componente Provider
export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
	const searchParams = useSearchParams();
	const listId = searchParams.get("listId");

	const {
		data: listData,
		isLoading,
		isError,
	} = useGetShoppingListDetail(listId);

	const updateProductCheckedMutation = useUpdateProductChecked();
	const deleteProductMutation = useDeleteProduct();
	const createProductMutation = useCreateProduct();
	const { toast } = useToast();

	const addItem = (item: Partial<ProductProps>) => {
		if (!listId) return;

		// O backend espera marketName e price, vamos passar valores padrão se não existirem
		createProductMutation.mutate(
			{
				...item,
				listId,
				marketName: item.marketName || "Mercado Principal",
				price: item.price || 0,
				name: item.name || "",
				category: item.category || "Geral",
				quantity: item.quantity || 1,
				unit: item.unit || "un",
				checked: false,
			} as ProductProps & { listId: string },
			{
				onSuccess: () => {
					toast({
						title: "Produto Adicionado!",
						description: `${item.name} foi colocado na sua lista.`,
						variant: "success",
					});
				},
				onError: () => {
					toast({
						title: "Erro ao adicionar",
						description: "Não foi possível adicionar o produto agora.",
						variant: "destructive",
					});
				},
			},
		);
	};

	const toggleItemChecked = (id: string) => {
		if (!listId || !listData) return;
		const findProduct = listData.items.find(
			(item: ProductProps) => item.id === id,
		);
		if (!findProduct) return;

		updateProductCheckedMutation.mutate({
			id,
			listId,
			checked: !findProduct.checked,
		});
	};

	const deleteItem = (id: string) => {
		if (!listId) return;
		deleteProductMutation.mutate(
			{ id, listId },
			{
				onSuccess: () => {
					toast({
						title: "Item Removido",
						description: "O produto foi retirado da sua lista.",
					});
				},
			},
		);
	};

	const handlePreviuesPage = () => {
		// Paginação simplificada para o novo endpoint que retorna tudo
	};

	const handleNextPage = () => {
		// Paginação simplificada para o novo endpoint que retorna tudo
	};

	// Adapta os dados da lista para o formato esperado pelos componentes
	const products: Pagination = {
		data: listData?.items || [],
		totalPages: 1,
		currentPage: 1,
		page: 1,
		limit: 100,
	};

	return (
		<ShoppingListContext.Provider
			value={{
				addItem,
				deleteItem,
				toggleItemChecked,
				products,
				list: listData || null,
				isLoading,
				isError,
				handlePreviuesPage,
				handleNextPage,
			}}
		>
			{children}
		</ShoppingListContext.Provider>
	);
};

// Hook para usar o contexto
export const useShoppingList = () => {
	const context = useContext(ShoppingListContext);
	if (!context) {
		throw new Error(
			"useShoppingList deve ser usado dentro de um ShoppingListProvider",
		);
	}
	return context;
};
