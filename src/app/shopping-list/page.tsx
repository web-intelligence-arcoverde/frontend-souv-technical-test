"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/features/auth";
import { ShoppingListView } from "@/views/shopping-list";
import { FullPageLoader } from "@/shared/ui/molecules/full-page-loader";

export default function ShoppingListPage() {
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

  return <ShoppingListView />;
}
