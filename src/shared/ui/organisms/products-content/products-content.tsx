import { useShoppingList } from "@/app/providers/use-shopping-list";
import { ProductItemList } from "../product-item-list/product-item-list";
import { RegisterProductForm } from "../register-product-form/register-product-form";

export const ProductContent = () => {
	const { products, isLoading, handleNextPage, handlePreviuesPage } =
		useShoppingList();

	return (
		<div>
			<RegisterProductForm />
			<ProductItemList
				products={products}
				isLoading={isLoading}
				handleNextPage={handleNextPage}
				handlePreviuesPage={handlePreviuesPage}
			/>
		</div>
	);
};
