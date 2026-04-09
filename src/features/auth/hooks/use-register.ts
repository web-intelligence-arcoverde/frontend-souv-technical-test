import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/auth-provider";
import { RegisterFormData } from "../schemas/register-schema";

export const useRegister = () => {
  const { register } = useAuth();

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      return await register(data.name, data.email, data.password);
    },
  });
};
