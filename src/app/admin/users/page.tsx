"use client";

import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import api from "@/shared/api/axios";
import { Header } from "@/shared/ui/organisms/header/header";

interface UserAccount {
	uid: string;
	name: string;
	email: string;
}

export default function AdminUsersPage() {
	const [users, setUsers] = useState<UserAccount[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const { isAuthenticated, isLoading: authLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!authLoading && !isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, authLoading, router]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await api.get("/auth/users");
				setUsers(response.data);
			} catch (err) {
				if (isAxiosError(err)) {
					setError(
						err.response?.data?.message ||
							"Erro ao carregar usuários. Verifique se você tem permissão.",
					);
				} else {
					setError("Ocorreu um erro inesperado ao carregar usuários.");
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (isAuthenticated) {
			fetchUsers();
		}
	}, [isAuthenticated]);

	if (authLoading || (!isAuthenticated && !isLoading)) {
		return (
			<div className="min-h-screen bg-gray-600 flex items-center justify-center text-gray-200">
				Carregando...
			</div>
		);
	}

	return (
		<div className="bg-gray-600 min-h-screen flex flex-col items-center p-6">
			<Header />

			<div className="w-full max-w-[720px] mt-8">
				<h2 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-2">
					<span className="w-2 h-6 bg-purple-500 rounded-full"></span>
					Gerenciamento de Contas
				</h2>

				{error ? (
					<div className="p-4 bg-red-900/30 border border-red-500/50 text-red-200 rounded-lg">
						{error}
					</div>
				) : isLoading ? (
					<div className="text-gray-400 text-center py-10">
						Buscando usuários...
					</div>
				) : (
					<div className="grid gap-4">
						{users.map((user) => (
							<div
								key={user.uid}
								className="bg-gray-700 p-5 rounded-lg border border-gray-600 flex justify-between items-center hover:border-purple-500/50 transition-colors shadow-lg"
							>
								<div>
									<h3 className="text-gray-100 font-semibold text-lg">
										{user.name}
									</h3>
									<p className="text-gray-400 text-sm">{user.email}</p>
								</div>
								<div className="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded">
									{user.uid.substring(0, 8)}...
								</div>
							</div>
						))}

						{users.length === 0 && (
							<div className="text-gray-400 text-center py-10 bg-gray-700/50 rounded-lg border border-dashed border-gray-600">
								Nenhuma conta encontrada.
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
