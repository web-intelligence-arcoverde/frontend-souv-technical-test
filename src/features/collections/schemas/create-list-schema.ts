import * as z from "zod";

export const createListSchema = z.object({
	title: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	description: z
		.string()
		.min(3, "A descrição deve ter pelo menos 3 caracteres"),
	category: z.string().min(1, "Selecione uma categoria"),
});

export type CreateListFormValues = z.infer<typeof createListSchema>;
