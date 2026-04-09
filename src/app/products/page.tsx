"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/shared/ui/templates/app-shell/app-shell";
import { ProductItemList } from "@/shared/ui/organisms/product-item-list/product-item-list";

export default function ProductsPage() {
  const router = useRouter();

  return (
    <AppShell>
      <header className="mb-14">
        <div className="flex items-center gap-4 mb-6 group cursor-pointer w-fit" onClick={() => router.push("/")}>
           <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
             <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_back</span>
           </div>
           <span className="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant/60 group-hover:text-primary transition-colors">Voltar ao Dashboard</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter mb-4 leading-none">
          Itens da Lista
        </h1>
        <p className="text-on-surface-variant text-lg font-medium opacity-70 tracking-tight max-w-2xl">
          Visualize e gerencie os itens selecionados para esta curadoria.
        </p>
      </header>

      <div className="bg-surface-container-low/50 backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <ProductItemList />
      </div>
    </AppShell>
  );
}
