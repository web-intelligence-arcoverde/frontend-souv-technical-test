"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateShoppingList } from "./use-create-shopping-list";
import { useToast } from "@/hooks/use-toast";
import {
  type CreateListFormValues,
  createListSchema,
} from "../schemas/create-list-schema";

interface UseCreateListModalOptions {
  onOpenChange: (open: boolean) => void;
}

export const useCreateListModal = ({
  onOpenChange,
}: UseCreateListModalOptions) => {
  const { mutate: createList, isPending } = useCreateShoppingList();
  const { toast } = useToast();

  const methods = useForm<CreateListFormValues>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      shared: false,
    },
  });

  const { reset, handleSubmit } = methods;

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

  return {
    ...methods,
    onSubmit: handleSubmit(onSubmit),
    isPending,
    errors: methods.formState.errors,
  };
};
