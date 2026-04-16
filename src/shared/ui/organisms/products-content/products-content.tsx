"use client";

import { ProductItemList } from "../product-item-list/product-item-list";
import { RegisterProductForm } from "../register-product-form/register-product-form";

export const ProductContent = () => {
  return (
    <div>
      <RegisterProductForm />
      <ProductItemList />
    </div>
  );
};
