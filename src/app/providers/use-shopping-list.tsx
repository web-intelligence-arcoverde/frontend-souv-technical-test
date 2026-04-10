import { useContext } from "react";
import { ShoppingListContext } from "./shopping-list-provider";

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      "useShoppingList deve ser usado dentro de um ShoppingListProvider",
    );
  }
  return context;
};
