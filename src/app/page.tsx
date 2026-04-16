"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { DashboardView } from "@/views/dashboard";
import { FullPageLoader } from "@/shared/ui/molecules/full-page-loader";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <FullPageLoader />;
  }

  return <DashboardView />;
}
