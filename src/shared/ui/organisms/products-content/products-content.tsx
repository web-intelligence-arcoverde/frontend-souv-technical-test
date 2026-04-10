import { RegisterProductForm } from "../register-product-form/register-product-form";
import { ProductItemList } from "../product-item-list/product-item-list";
import { useShoppingList } from "@/app/providers/use-shopping-list";

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
