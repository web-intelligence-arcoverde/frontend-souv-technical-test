"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [{ label: "Despensa", icon: "inventory_2", href: "/" }];

interface SidebarProps {
  onOpenCreateList: () => void;
}

export const Sidebar = ({ onOpenCreateList }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col h-screen w-72 border-r border-outline-variant/10 bg-surface-container-low py-10 px-8 space-y-12 flex-shrink-0">
      <div className="mb-4">
        <h1 className="text-2xl font-black text-white tracking-tighter uppercase font-headline">
          Provisions
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mt-1">
          Culinary Curator
        </p>
      </div>

      <nav className="flex-1 space-y-8">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center space-x-4 transition-all duration-300 group",
                isActive
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-white",
              )}
            >
              <div className="relative flex items-center gap-4">
                <span
                  className={cn(
                    "material-symbols-outlined text-2xl transition-all duration-300",
                    isActive ? "fill-1" : "group-hover:scale-110",
                  )}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="text-sm tracking-wide">{item.label}</span>
                {isActive && (
                  <div className="absolute -left-8 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_12px_rgba(204,151,255,0.6)]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer with Create Button */}
      <div className="pt-8 border-t border-outline-variant/10">
        <button
          onClick={onOpenCreateList}
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-2xl py-4 px-6 font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-[0.98] group flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform">
            add
          </span>
          Nova Lista
        </button>
      </div>
    </aside>
  );
};
