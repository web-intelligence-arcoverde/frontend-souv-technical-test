"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CollectionCard } from "@/shared/ui/molecules/collection-card/collection-card";
import { useGetShoppingLists } from "@/hooks/use-get-shopping-lists";

export const CollectionsGrid = () => {
  const router = useRouter();
  const { data: lists, isLoading, error } = useGetShoppingLists();

  const handleOpenList = (id: string) => {
    router.push(`/products?listId=${id}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-[400px] bg-surface-container-low rounded-3xl animate-pulse border border-white/5"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-12 bg-surface-container-low rounded-3xl border border-error/20 flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-4xl text-error opacity-50">
          error
        </span>
        <p className="text-on-surface-variant font-bold uppercase tracking-widest text-[10px]">
          Não foi possível carregar as suas listas.
        </p>
      </div>
    );
  }

  if (!lists || lists.length === 0) {
    return (
      <div className="text-center p-16 bg-surface-container-low rounded-3xl border border-white/5 flex flex-col items-center gap-6 group hover:bg-surface-container-high transition-all">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-4xl text-primary">
            shopping_basket
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-on-surface font-black uppercase tracking-[0.2em] text-xs">
            Sua despensa está vazia
          </p>
          <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">
            Crie sua primeira lista para começar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {lists.map((list) => (
        <CollectionCard
          key={list.id}
          {...list}
          onOpen={() => handleOpenList(list.id)}
        />
      ))}
    </div>
  );
};
