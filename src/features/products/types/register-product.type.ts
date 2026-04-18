import type { z } from "zod";
import type { registerProductSchema } from "../schemas/register-product.schema";

export type RegisterProductFormValues = z.infer<typeof registerProductSchema>;
