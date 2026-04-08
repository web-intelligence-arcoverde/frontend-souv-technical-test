import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/auth-provider";
import { LoginFormData } from "../schemas/login-schema";
import { isAxiosError } from "axios";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      return login(data.email, data.password);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return error.response?.data?.message || "Erro ao realizar login";
      }
      return "Ocorreu um erro inesperado";
    },
  });
};
