"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useCreateProduct } from "@/hooks/use-create-product";
import { useToast } from "@/hooks/use-toast";
import { registerProductSchema } from "../schemas/register-product.schema";
import type { RegisterProductFormValues } from "../types/register-product.type";
import type { ProductProps } from "@/types/product";

export const useRegisterProduct = () => {
  const searchParams = useSearchParams();
  const listId = searchParams.get("listId");
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { toast } = useToast();

  const methods = useForm<RegisterProductFormValues>({
    resolver: zodResolver(registerProductSchema),
    mode: "onChange",
    defaultValues: {
      item: "",
      marketName: "",
      price: 0,
      quantity: { unit: "un", quantity: 1 },
      category: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = methods;

  const onSubmit = (data: RegisterProductFormValues) => {
    if (!listId) return;

    createProduct(
      {
        name: data.item,
        marketName: data.marketName || "Mercado Principal",
        price: data.price || 0,
        quantity: data.quantity.quantity || 1,
        unit: data.quantity.unit || "un",
        category: data.category || "Geral",
        listId,
        checked: false,
      } as ProductProps & { listId: string },
      {
        onSuccess: () => {
          toast({
            title: "Produto Adicionado!",
            description: `${data.item} foi colocado na sua lista.`,
            variant: "success",
          });
        },
        onError: () => {
          toast({
            title: "Erro ao adicionar",
            description: "Não foi possível adicionar o produto agora.",
            variant: "destructive",
          });
        },
      },
    );

    reset({
      item: "",
      marketName: "",
      price: 0,
      quantity: { unit: "un", quantity: 1 },
      category: "",
    });
  };

  return { onSubmit, control, handleSubmit, errors, isValid, isDirty, isPending };
};
