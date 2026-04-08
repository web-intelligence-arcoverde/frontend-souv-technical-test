"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/providers/auth-provider";
import Link from "next/link";
import { isAxiosError } from "axios";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Erro ao realizar login");
      } else {
        setError("Ocorreu um erro inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-700 rounded-lg shadow-xl border border-gray-600">
      <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">Login</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 text-sm rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2 text-sm" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 text-sm" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {isLoading ? "Carregando..." : "Entrar"}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-400 text-sm">
        Não tem uma conta?{" "}
        <Link href="/register" className="text-purple-400 hover:text-purple-300 font-semibold underline">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
};
