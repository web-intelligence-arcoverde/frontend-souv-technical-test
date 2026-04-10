"use client";

import React, { createContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { authState, authActions } from "@/store/auth";
import { AuthService } from "@/services/auth.service";

interface User {
  uid: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const snap = useSnapshot(authState);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      authActions.setUser(JSON.parse(savedUser));
    } else {
      authActions.setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await AuthService.login(email, password);
      const { token, refreshToken, ...userData } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
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
      const data = await AuthService.register(name, email, password);
      const { token, refreshToken, ...userData } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(userData));

      authActions.setUser(userData);
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    authActions.logout();
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user: snap.user as User | null,
        isAuthenticated: snap.isAuthenticated,
        isLoading: snap.isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
