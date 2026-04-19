"use client";

import React from "react";
import { SHOPPING_LIST_TYPES } from "../constants/shopping-list-types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: {
    category?: string;
    shared?: boolean;
    variant?: string;
  };
  onFilterChange: (filters: {
    category?: string;
    shared?: boolean;
    variant?: string;
  }) => void;
}

export const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar md:overflow-visible md:pb-0">
        <button
          onClick={() => onFilterChange({ ...filters, category: undefined })}
          className={cn(
            "px-4 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap",
            !filters.category
              ? "bg-primary border-primary text-on-primary shadow-lg shadow-primary/20"
              : "bg-surface-variant/10 border-white/10 text-on-surface-variant hover:bg-surface-variant/20",
          )}
        >
          Todas as Categorias
        </button>
        {SHOPPING_LIST_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => onFilterChange({ ...filters, category: type.id })}
            className={cn(
              "px-4 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2",
              filters.category === type.id
                ? "bg-primary border-primary text-on-primary shadow-lg shadow-primary/20"
                : "bg-surface-variant/10 border-white/10 text-on-surface-variant hover:bg-surface-variant/20",
            )}
          >
            <span className="material-symbols-outlined text-lg">
              {type.icon}
            </span>
            {type.label}
          </button>
        ))}
      </div>

      <div className="h-8 w-px bg-white/10 hidden md:block" />

      <button
        onClick={() => onFilterChange({ ...filters, shared: !filters.shared })}
        className={cn(
          "px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2",
          filters.shared
            ? "bg-secondary border-secondary text-on-secondary shadow-lg shadow-secondary/20"
            : "bg-surface-variant/10 border-white/10 text-on-surface-variant hover:bg-surface-variant/20",
        )}
      >
        <span className="material-symbols-outlined text-lg">
          {filters.shared ? "share" : "share_off"}
        </span>
        Compartilhadas
      </button>
    </div>
  );
};
