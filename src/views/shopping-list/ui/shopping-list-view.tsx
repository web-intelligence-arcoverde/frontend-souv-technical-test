"use client";

import React, { useState } from "react";
import { CollectionsGrid, FilterBar } from "@/features/shopping-list";
import { AppShell } from "@/shared/ui/templates/app-shell/app-shell";

interface FilterState {
  shared?: boolean;
  category?: string;
  variant?: string;
}

export const ShoppingListView = () => {
  const [filters, setFilters] = useState<FilterState>({
    shared: true,
    category: undefined,
    variant: undefined,
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <AppShell>
      <header className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter mb-4 leading-none">
            Listas Compartilhadas
          </h1>
          <p className="text-on-surface-variant text-lg font-medium opacity-70 tracking-tight max-w-2xl">
            Explore e gerencie as listas que foram compartilhadas com você ou pelo sistema.
          </p>
        </div>
      </header>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <CollectionsGrid filters={filters} />
    </AppShell>
  );
};
