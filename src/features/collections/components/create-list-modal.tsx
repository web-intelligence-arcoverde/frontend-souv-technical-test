"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const createListSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
});

type CreateListFormValues = z.infer<typeof createListSchema>;

const CATEGORIES = [
  { id: "meat", label: "Carnes", icon: "restaurant", color: "text-primary" },
  {
    id: "bakery",
    label: "Padaria",
    icon: "bakery_dining",
    color: "text-secondary",
  },
  { id: "produce", label: "Hortifruti", icon: "eco", color: "text-tertiary" },
  {
    id: "dairy",
    label: "Laticínios",
    icon: "water_drop",
    color: "text-blue-400",
  },
  {
    id: "pantry",
    label: "Despensa",
    icon: "inventory_2",
    color: "text-zinc-400",
  },
];

interface CreateListModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateListModal = ({
  isOpen,
  onOpenChange,
}: CreateListModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateListFormValues>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const selectedCategory = watch("category");

  const onSubmit = (data: CreateListFormValues) => {
    console.log("Creating list:", data);
    // Mock successful creation
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content
          className={cn(
            "fixed z-[101] bg-surface-container-low border border-white/5 shadow-2xl transition-all duration-300 h-fit",
            "lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-lg lg:rounded-[2rem] lg:p-10",
            "left-0 bottom-0 w-full rounded-t-[2.5rem] p-8 pb-12", // Mobile Bottom Sheet
            "data-[state=open]:animate-in data-[state=closed]:animate-out lg:data-[state=closed]:zoom-out-95 lg:data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          )}
        >
          {/* Mobile Handlebar */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="w-12 h-1 bg-outline-variant rounded-full opacity-30" />
          </div>

          <div className="flex justify-between items-center mb-8">
            <Dialog.Title className="text-2xl font-black text-white tracking-tighter">
              Nova Lista
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest/50 text-on-surface-variant hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* List Name */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                Nome da Lista
              </label>
              <div className="relative group">
                <input
                  {...register("name")}
                  className={cn(
                    "w-full bg-surface-container-highest border-none rounded-2xl py-4 px-6 text-on-surface text-lg",
                    "placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary/40 transition-all",
                    errors.name && "ring-1 ring-error/50",
                  )}
                  placeholder="ex: Churrasco de Domingo"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-error font-bold ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/70 ml-1">
                Selecione o Tema
              </label>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setValue("category", cat.id)}
                    className={cn(
                      "flex items-center gap-2.5 px-6 py-3 rounded-full transition-all active:scale-95 border-2",
                      selectedCategory === cat.id
                        ? "bg-primary text-on-primary border-primary shadow-[0_0_20px_rgba(204,151,255,0.2)]"
                        : "bg-surface-container-highest text-on-surface-variant border-transparent hover:border-white/10",
                    )}
                  >
                    <span
                      className={cn(
                        "material-symbols-outlined text-[20px]",
                        selectedCategory === cat.id ? "fill-1" : "",
                      )}
                      style={
                        selectedCategory === cat.id
                          ? { fontVariationSettings: "'FILL' 1" }
                          : {}
                      }
                    >
                      {cat.icon}
                    </span>
                    <span className="text-xs font-bold tracking-tight">
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="text-xs text-error font-bold ml-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="pt-6 space-y-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed h-14 rounded-2xl font-black text-lg tracking-tight shadow-[0_8px_30px_rgba(204,151,255,0.2)] active:scale-[0.98] transition-all hover:brightness-110"
              >
                Criar Coleção
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
