"use client";

import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_OPTIONS } from "@/shared/constants/categories";
import { Button } from "../../atoms/Button/Button";
import { InputWithLabel } from "../../molecules/Input/Input";
import { SelectCategory } from "../../molecules/select-category/select-category";
import { SelectQuantity } from "../../molecules/select-quantity/select-quantity";
import { useRegisterProduct } from "./use-register-product";

export const RegisterProductForm = () => {
	const { handleSubmit, onSubmit, control, errors, isValid } =
		useRegisterProduct();

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex mb-8 flex-col gap-6 bg-surface-container-high/30 p-4 sm:p-8 rounded-2xl sm:rounded-[32px] border border-white/5 shadow-inner"
		>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col md:flex-row gap-4">
					<InputWithLabel
						control={control}
						name="item"
						label="Nome do Produto:"
						placeholder="Ex: Leite Integral"
						error={errors.item?.message}
					/>

					<InputWithLabel
						control={control}
						name="marketName"
						label="Nome do Mercado:"
						placeholder="Ex: Carrefour"
						error={errors.marketName?.message}
					/>
				</div>
				<div className="flex flex-col md:flex-row gap-4">
					<InputWithLabel
						control={control}
						name="price"
						label="Preço Unit"
						placeholder="R$ 0,00"
						isCurrency
						error={errors.price?.message}
					/>

					<SelectCategory
						control={control}
						name="category"
						label="Categoria:"
						placeholder="Tipo"
						options={CATEGORY_OPTIONS}
						error={errors.category?.message}
					/>

					<SelectQuantity
						control={control}
						name="quantity"
						error={errors.quantity?.quantity?.message}
					/>
				</div>
			</div>

			<div className="flex justify-end pt-2 border-t border-white/5">
				<Button
					type="submit"
					disabled={!isValid}
					className={cn(
						"w-full md:w-auto mt-4 rounded-xl px-12 h-12 font-black uppercase text-[11px] tracking-[0.3em] transition-all",
						isValid
							? "bg-primary hover:bg-primary-hover text-on-primary shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 active:scale-[0.98]"
							: "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed opacity-50 border border-white/5",
					)}
				>
					<PlusIcon
						className={cn(
							"w-5 h-5 mr-3 stroke-[3]",
							isValid ? "animate-pulse" : "",
						)}
					/>
					Adicionar
				</Button>
			</div>
		</form>
	);
};
