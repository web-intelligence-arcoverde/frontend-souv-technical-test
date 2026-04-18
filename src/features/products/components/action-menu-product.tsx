"use client";

import { MoreVertical, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useDeleteProduct } from "../hooks/use-delete-product";

interface ActionMenuProductProps {
  id: string;
}

export const ActionMenuProduct = ({ id }: ActionMenuProductProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { deleteProductItem, isPending } = useDeleteProduct(() => setIsVisible(false));

  const handleDelete = () => {
    deleteProductItem(id);
  };

  return (
    <div className="relative">
      <button
        type="button"
        title="Menu"
        disabled={isPending}
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10 active:scale-95 disabled:opacity-50",
          isVisible && "bg-white/10 border-white/10",
        )}
        onClick={() => setIsVisible(!isVisible)}
      >
        <MoreVertical
          size={18}
          className="text-on-surface-variant group-hover:text-primary transition-colors"
        />
      </button>

      {isVisible && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsVisible(false)}
          />
          <div
            role="menu"
            className="z-50 absolute right-0 top-full mt-2 w-48 bg-surface-container-highest/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              disabled={isPending}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-error hover:bg-error/10 transition-colors text-left disabled:opacity-50"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
              {isPending ? "Excluindo..." : "Excluir Item"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
