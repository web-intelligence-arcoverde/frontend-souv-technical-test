"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useCreateShoppingList } from "@/hooks/use-create-shopping-list";
import { useToast } from "@/hooks/use-toast";
import { InputWithLabel } from "@/shared/ui/molecules/Input/Input";
import { TextareaWithLabel } from "@/shared/ui/molecules/Textarea/Textarea";
import { ThemeSelector } from "@/shared/ui/molecules/theme-selector/theme-selector";
import { SHOPPING_LIST_TYPES } from "@/constants/shopping-list-types";
import {
  createListSchema,
  CreateListFormValues,
} from "../schemas/create-list-schema";
import { CreateListModalProps } from "../types/create-list-modal";

export const CreateListModal = ({
  isOpen,
  onOpenChange,
}: CreateListModalProps) => {
  const { mutate: createList, isPending } = useCreateShoppingList();
  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateListFormValues>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const onSubmit = (data: CreateListFormValues) => {
    createList(data, {
      onSuccess: () => {
        toast({
          title: "Sucesso!",
          description: "Sua nova lista foi criada com sucesso.",
          variant: "success",
        });
        onOpenChange(false);
        reset();
      },
      onError: () => {
        toast({
          title: "Erro ao criar lista",
          description:
            "Ocorreu um problema ao tentar criar sua lista. Tente novamente.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content
          className={cn(
            "fixed z-[101] bg-surface-container-low border border-white/5 shadow-2xl transition-all duration-300 h-fit",
            "lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-xl lg:rounded-[2rem] lg:p-10",
            "left-0 bottom-0 w-full rounded-t-[2.5rem] p-8 pb-12",
            "data-[state=open]:animate-in data-[state=closed]:animate-out lg:data-[state=closed]:zoom-out-95 lg:data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          )}
        >
          <div className="lg:hidden flex justify-center mb-6">
            <div className="w-12 h-1 bg-outline-variant rounded-full opacity-30" />
          </div>

          <div className="flex justify-between items-center mb-8">
            <Dialog.Title className="text-2xl font-black text-white tracking-tighter">
              Criar Lista de Compras
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-surface-container-highest/50 text-on-surface-variant hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputWithLabel
              control={control}
              name="title"
              label="Nome da Lista de Compras:"
              placeholder="ex: Compras de Janeiro"
              error={errors.title?.message}
            />

            <TextareaWithLabel
              control={control}
              name="description"
              label="Descrição:"
              placeholder="Descreva o propósito desta lista..."
              error={errors.description?.message}
              rows={3}
            />

            <ThemeSelector
              control={control}
              name="category"
              label="Selecione o Tema:"
              options={SHOPPING_LIST_TYPES}
              error={errors.category?.message}
            />

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className={cn(
                  "w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed h-14 rounded-2xl font-black text-lg tracking-tight shadow-[0_8px_30px_rgba(204,151,255,0.2)] active:scale-[0.98] transition-all hover:brightness-110 flex items-center justify-center",
                  isPending && "opacity-70 cursor-not-allowed",
                )}
              >
                {isPending ? "Criando..." : "Criar"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
