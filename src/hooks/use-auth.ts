"use client";

import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { AuthService } from "@/services/auth.service";
import { authActions, authState } from "@/store/auth";

export const useAuth = () => {
	const snap = useSnapshot(authState);
	const router = useRouter();

	const login = async (email: string, password: string) => {
		try {
			const userData = await AuthService.login(email, password);

			localStorage.setItem("user", JSON.stringify(userData));

			authActions.setUser(userData);
			router.push("/");
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	};

	const register = async (name: string, email: string, password: string) => {
		try {
			const userData = await AuthService.register(name, email, password);

			localStorage.setItem("user", JSON.stringify(userData));

			authActions.setUser(userData);
			router.push("/");
		} catch (error) {
			console.error("Registration failed:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await AuthService.logout();
			authActions.logout();
			router.push("/login");
		} catch (error) {
			console.error("Logout failed:", error);
			// Force logout anyway
			authActions.logout();
			router.push("/login");
		}
	};

	return {
		user: snap.user,
		isAuthenticated: snap.isAuthenticated,
		isLoading: snap.isLoading,
		status: snap.status,
		login,
		register,
		logout,
	};
};
