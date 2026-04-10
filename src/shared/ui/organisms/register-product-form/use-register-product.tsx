"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useShoppingList } from "@/app/providers/shopping-list-provider";
import { formSchema } from "./register-product-form.schema";
import type { FormValues } from "./register-product-form.type";

export const useRegisterProduct = () => {
	const { addItem } = useShoppingList();

	const methods = useForm<FormValues>({
		resolver: zodResolver(formSchema),
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

	const onSubmit = (data: FormValues) => {
		addItem({
			name: data.item,
			marketName: data.marketName,
			price: data.price,
			quantity: data.quantity.quantity,
			unit: data.quantity.unit,
			category: data.category,
		});

		reset({
			item: "",
			marketName: "",
			price: 0,
			quantity: { unit: "un", quantity: 1 },
			category: "",
		});
	};

	return { onSubmit, control, handleSubmit, errors, isValid, isDirty };
};
