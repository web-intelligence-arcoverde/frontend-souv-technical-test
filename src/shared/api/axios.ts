import axios from "axios";

/**
 * Instância do Axios configurada para o BFF (Backend For Frontend).
 * Como estamos usando Cookies HttpOnly, o navegador gerencia automaticamente
 * o envio dos tokens para as rotas /api/*. Não é necessário injetar tokens manualmente.
 */
const api = axios.create({
	baseURL: "/api",
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("user");

			if (typeof window !== "undefined" && !window.location.pathname.includes("/login") && !window.location.pathname.includes("/shared")) {
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	},
);

export default api;
