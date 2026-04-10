"use client";

import React from "react";
import { PRODUCT_CATEGORIES } from "@/shared/constants/categories";
import { cn } from "@/lib/utils";

interface CategoryTagProps {
  category: string;
}

export const CategoryTag = ({ category }: CategoryTagProps) => {
  const config = PRODUCT_CATEGORIES[category] || PRODUCT_CATEGORIES.utilitarios;
  const { label, icon, color } = config;

  return (
    <div
      className={cn(
        "flex flex-row items-center px-4 py-1.5 rounded-xl gap-2.5 border transition-all duration-300",
        color.bg,
        color.border
      )}
    >
      <span className={cn("transition-colors duration-300", color.text)}>
        {icon}
      </span>
      <span
        className={cn(
          "hidden md:block text-[10px] font-black uppercase tracking-[0.1em] transition-colors duration-300",
          color.text
        )}
      >
        {label}
      </span>
    </div>
  );
};
