"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{ label: "Despensa", icon: "inventory_2", href: "/" },
	{ label: "Compartilhados", icon: "group", href: "/shared" },
];

export const BottomNav = () => {
	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-low md:hidden px-6 pt-3 pb-8 flex justify-between items-center shadow-[0_-8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl bg-opacity-90 border-t border-white/5">
			{NAV_ITEMS.map((item) => {
				const isActive = pathname === item.href;
				return (
					<Link
						key={item.label}
						href={item.href}
						className="flex flex-col items-center gap-1.5 group relative px-2"
					>
						<span
							className={cn(
								"material-symbols-outlined text-2xl transition-all duration-300",
								isActive
									? "text-primary scale-110"
									: "text-on-surface-variant group-active:scale-90",
							)}
							style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
						>
							{item.icon}
						</span>
						<span
							className={cn(
								"text-[10px] font-bold tracking-wider transition-colors duration-300",
								isActive ? "text-primary" : "text-on-surface-variant",
							)}
						>
							{item.label}
						</span>
						{isActive && (
							<div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(204,151,255,1)]" />
						)}
					</Link>
				);
			})}
		</nav>
	);
};
