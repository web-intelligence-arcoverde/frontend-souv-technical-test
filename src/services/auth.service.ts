import axios from "axios";

// This service hits our LOCAL Next.js API Routes, which then proxy to the real backend
const API_URL = "/api/auth";

export const AuthService = {
	login: async (email: string, password: string) => {
		const response = await axios.post(`${API_URL}/login`, { email, password });
		return response.data;
	},

	register: async (name: string, email: string, password: string) => {
		const response = await axios.post(`${API_URL}/register`, {
			name,
			email,
			password,
		});
		return response.data;
	},

	refresh: async (refreshToken: string) => {
		const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
		return response.data;
	},

	logout: async () => {
		await axios.post(`${API_URL}/logout`);
	},
};
