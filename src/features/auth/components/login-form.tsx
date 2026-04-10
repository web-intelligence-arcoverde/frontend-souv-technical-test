"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { isAxiosError } from "axios";
import { loginSchema, LoginFormData } from "../schemas/login-schema";
import { useLogin } from "../hooks/use-login";
import { TextField } from "@/shared/ui/molecules/text-field/text-field";
import { Button } from "@/shared/ui/atoms/Button/Button";
import { SocialAuthGroup } from "./social-auth-group";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: loginMutation, isPending } = useLogin();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");
    try {
      await loginMutation(data);
    } catch (err) {
      if (isAxiosError(err)) {
        setServerError(err.response?.data?.message || "Erro ao realizar login");
      } else {
        setServerError("Ocorreu um erro inesperado");
      }
    }
  };

  return (
    <div className="glass-panel p-8 rounded-xl border border-outline-variant/10 shadow-2xl w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {serverError && (
          <div className="p-3 bg-error-container/20 border border-error/50 text-error-dim text-xs rounded-lg font-bold">
            {serverError}
          </div>
        )}

        <TextField
          {...register("email")}
          id="email"
          label="Email:"
          icon="mail"
          type="email"
          placeholder="lucas@webintelligenci.com"
          error={errors.email?.message}
        />

        <TextField
          {...register("password")}
          id="password"
          label="Senha:"
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

        <Button
          variant="premium-gradient"
          size="full"
          type="submit"
          isLoading={isPending}
        >
          {isPending ? "Acessando..." : "Entrar"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-grow h-[1px] bg-outline-variant/20"></div>
        <span className="px-4 text-[10px] font-bold text-outline uppercase tracking-widest text-center whitespace-nowrap">
          ou continue com
        </span>
        <div className="flex-grow h-[1px] bg-outline-variant/20"></div>
      </div>

      <SocialAuthGroup />

      <div className="mt-8 text-center" />
      <p className="text-sm text-on-surface-variant text-center">
        Não tem uma conta?
        <Link
          href="/register"
          className="text-primary font-bold hover:underline underline-offset-4 ml-1"
        >
          Criar conta
        </Link>
      </p>
    </div>
  );
};
