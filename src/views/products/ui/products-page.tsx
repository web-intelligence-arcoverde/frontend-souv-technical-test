"use client";

import React from "react";
import { AppShell } from "@/shared/ui/templates/app-shell/app-shell";
import { RegisterProductForm, ProductItemList } from "@/features/products";
import { Header } from "./widgets/header";

export const ProductsPage = () => {
  return (
    <AppShell>
      <React.Suspense fallback={null}>
        <Header />
        <div className="bg-surface-container-low/50 backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div>
            <RegisterProductForm />
            <ProductItemList />
          </div>
        </div>
      </React.Suspense>
    </AppShell>
  );
};
