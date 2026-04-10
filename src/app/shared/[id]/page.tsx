"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useGetPublicShoppingList } from "@/hooks/use-get-public-shopping-list";
import { Badge } from "@/shared/ui/atoms/badge/badge";
import type { ItemProps } from "@/shared/ui/molecules/product-item/product-item";
import { ProductItemList } from "@/shared/ui/organisms/product-item-list/product-item-list";

const SharedShoppingListPage = () => {
	const params = useParams();
	const id = params.id as string;

	const { data: list, isLoading } = useGetPublicShoppingList(id);

	const badgeVariants = {
		primary: "default" as const,
		secondary: "secondary" as const,
		tertiary: "tertiary" as const,
	};

	if (!list && !isLoading) {
		return (
			<div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4">
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold text-white">
						Lista não encontrada
					</h1>
					<p className="text-on-surface-variant">
						O link que você acessou pode estar expirado ou incorreto.
					</p>
				</div>
			</div>
		);
	}

	return (
		<main className="min-h-screen bg-[#0A0A0B] text-on-surface selection:bg-primary/30">
			{/* Ambient Background Glow */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-[25%] -left-[10%] w-[70%] h-[70%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
				<div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-secondary/10 blur-[130px] rounded-full" />
			</div>

			<div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
				{/* Header Section */}
				<header className="mb-12 space-y-6 text-center md:text-left animate-in fade-in slide-in-from-top-4 duration-700">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
						<div className="space-y-4">
							{!isLoading && list?.category && (
								<Badge
									variant={
										badgeVariants[list.variant as keyof typeof badgeVariants] ||
										"default"
									}
									className="px-4 py-1.5 text-xs font-black tracking-[0.2em] uppercase"
								>
									{list.category}
								</Badge>
							)}
							<div className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
								{isLoading ? (
									<div className="h-12 w-64 bg-surface-container-high animate-pulse rounded-2xl mx-auto md:mx-0" />
								) : (
									list?.title
								)}
							</div>
							<div className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
								{isLoading ? (
									<div className="h-6 w-full bg-surface-container-high animate-pulse rounded-xl mt-2" />
								) : (
									list?.description
								)}
							</div>
						</div>
					</div>
				</header>

				{/* Content Section */}
				<div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
					<div className="bg-surface-container-low/50 backdrop-blur-xl rounded-[40px] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden">
						<div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
							<span className="material-symbols-outlined text-8xl text-white">
								shopping_bag
							</span>
						</div>

						<div className="relative">
							<h2 className="text-xs font-black text-on-surface-variant/60 tracking-[0.3em] uppercase mb-10 flex items-center gap-4">
								Itens da Lista
								<span className="h-px flex-1 bg-outline-variant/20" />
							</h2>

							<ProductItemList
								products={(list?.items as unknown as ItemProps[]) || []}
								isLoading={isLoading}
								handleNextPage={() => {}}
								handlePreviuesPage={() => {}}
								isReadOnly={true}
							/>
						</div>
					</div>
				</div>

				<footer className="mt-16 text-center text-on-surface-variant/40 animate-in fade-in duration-1000 delay-500">
					<p className="text-[10px] font-black uppercase tracking-[0.5em]">
						Gerado via Souv Shopping List
					</p>
				</footer>
			</div>
		</main>
	);
};

export default SharedShoppingListPage;
