"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export const TopNav = () => {
	const { logout } = useAuth();
	return (
		<header className="flex justify-between items-center w-full px-6 md:px-10 py-6 bg-surface z-40 border-b border-white/5 md:border-none">
			<div className="flex flex-col lg:hidden">
				<span className="text-[10px] text-primary tracking-[0.3em] uppercase font-black">
					Culinary Curator
				</span>
			</div>

			<div className="hidden lg:flex items-center gap-10">
				<div className="flex items-center gap-2">
					{["Painel"].map((label, i) => (
						<button
							key={label}
							className={cn(
								"px-5 py-2 rounded-xl text-sm font-bold tracking-tight transition-all duration-300",
								i === 0
									? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(204,151,255,0.1)]"
									: "text-on-surface-variant hover:text-white hover:bg-white/5",
							)}
						>
							{label}
						</button>
					))}
				</div>
			</div>

			<div className="flex items-center gap-2 md:gap-5">
				<Button onClick={logout} className="md:mb-1 gap-2">
					<span className="material-symbols-outlined text-xl">logout</span>
					Sair
				</Button>
			</div>
		</header>
	);
};
