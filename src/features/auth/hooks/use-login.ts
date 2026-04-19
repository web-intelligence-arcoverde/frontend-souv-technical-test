import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useAuth } from "./use-auth";
import type { LoginFormData } from "../schemas/login-schema";

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
