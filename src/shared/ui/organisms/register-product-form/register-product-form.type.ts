import type { z } from "zod";
import type { formSchema } from "./register-product-form.schema";

export type FormValues = z.infer<typeof formSchema>;
