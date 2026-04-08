"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/app/providers/auth-provider";
import { ProductItemList } from "@/shared/ui/organisms/product-item-list/product-item-list";
import { Header } from "@/shared/ui/organisms/header/header";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-screen bg-gray-600 flex items-center justify-center text-gray-200">Carregando...</div>;
  }

  return (
    <div className="bg-gray-600 h-screen flex flex-col  items-center ">
      <div className="relative w-full h-[180px]">
        <Image
          src="/header.png"
          alt="logo"
          fill
          sizes="100vw"
          className="md:object-cover"
        />
      </div>
      <div className="flex flex-col w-full absolute top-12 items-center p-6">
        <Header />
        <ProductItemList />
      </div>
    </div>
  );
}
