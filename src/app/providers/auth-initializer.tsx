"use client";

import { useEffect } from "react";
import { authActions } from "@/store/auth";

export function AuthInitializer() {
	useEffect(() => {
		if (typeof window !== "undefined") {
			const savedUser = localStorage.getItem("user");

			if (savedUser) {
				try {
					authActions.setUser(JSON.parse(savedUser));
				} catch (e) {
					console.error("Failed to parse saved user", e);
					authActions.setLoading(false);
				}
			} else {
				authActions.setLoading(false);
			}
		}
	}, []);

	return null;
}
