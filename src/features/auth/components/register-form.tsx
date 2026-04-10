"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/atoms/Button/Button";
import { TextField } from "@/shared/ui/molecules/text-field/text-field";
import { useRegister } from "../hooks/use-register";
import {
	type RegisterFormData,
	registerSchema,
} from "../schemas/register-schema";
import { SocialAuthGroup } from "./social-auth-group";

export const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { mutateAsync: registerMutation, isPending } = useRegister();
	const [serverError, setServerError] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		setServerError("");
		try {
			await registerMutation(data);
		} catch (err) {
			if (isAxiosError(err)) {
				setServerError(err.response?.data?.message || "Erro ao criar conta");
			} else {
				setServerError("Ocorreu um erro inesperado");
			}
		}
	};

	return (
		<div className="w-full max-w-md">
			<header className="mb-10 text-center lg:text-left">
				<h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
					Create Account
				</h2>
				<p className="text-on-surface-variant">
					Elevate your kitchen management experience.
				</p>
			</header>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{serverError && (
					<div className="p-3 bg-error-container/20 border border-error/50 text-error-dim text-xs rounded-lg font-bold">
						{serverError}
					</div>
				)}

				<TextField
					{...register("name")}
					id="name"
					label="Nome"
					icon="person"
					placeholder="Lucas Henrique"
					error={errors.name?.message}
				/>

				<TextField
					{...register("email")}
					id="email"
					label="Email Address"
					icon="mail"
					type="email"
					placeholder="lucas@webintelligence.com.br"
					error={errors.email?.message}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<TextField
						{...register("password")}
						id="password"
						label="Senha"
						icon="lock"
						type={showPassword ? "text" : "password"}
						placeholder="••••••••"
						error={errors.password?.message}
						rightElement={
							<button
								type="button"
								className="flex items-center justify-center h-full"
								onClick={() => setShowPassword(!showPassword)}
							>
								<span className="material-symbols-outlined text-xl">
									{showPassword ? "visibility_off" : "visibility"}
								</span>
							</button>
						}
					/>
					<TextField
						{...register("confirmPassword")}
						id="confirmPassword"
						label="Confirmar senha"
						icon="verified_user"
						type={showPassword ? "text" : "password"}
						placeholder="••••••••"
						error={errors.confirmPassword?.message}
					/>
				</div>

				<Button
					variant="premium-gradient"
					size="full"
					type="submit"
					isLoading={isPending}
				>
					{isPending ? "Criando conta..." : "Criar conta"}
				</Button>
			</form>

			<div className="mt-12 text-center">
				<p className="text-on-surface-variant text-sm">
					Já tem uma conta?
					<Link
						href="/login"
						className="text-primary font-bold ml-1 hover:text-white transition-colors"
					>
						Entrar
					</Link>
				</p>
			</div>

			<footer className="mt-16 flex flex-col items-center gap-4">
				<div className="flex gap-4">
					<SocialAuthGroup />
				</div>
				<span className="text-[10px] uppercase tracking-widest text-outline">
					© {new Date().getFullYear()} Web Intelligence - Arcoverde
				</span>
			</footer>
		</div>
	);
};
