import { z } from "zod";

export const formSchema = z.object({
	item: z.string().min(2, "O nome do produto deve ter pelo menos 2 caracteres"),
	marketName: z.string().min(2, "Informe o nome do mercado"),
	price: z.coerce
		.number({ invalid_type_error: "Informe um preço válido" })
		.min(0.01, "O preço deve ser maior que zero"),
	quantity: z.object({
		quantity: z.number().min(1, "A quantidade deve ser pelo menos 1"),
		unit: z.string().min(1, "Selecione uma unidade"),
	}),
	category: z.string().min(1, "Selecione uma categoria"),
});
