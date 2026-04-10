"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/shared/ui/templates/app-shell/app-shell";
import { CollectionsGrid } from "@/features/collections/components/collections-grid";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-primary font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <header className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter mb-4 leading-none">
            Minhas Listas
          </h1>
          <p className="text-on-surface-variant text-lg font-medium opacity-70 tracking-tight max-w-2xl">
            Gerencie e organize suas listas de compras.
          </p>
        </div>
      </header>

      <CollectionsGrid />
    </AppShell>
  );
}
