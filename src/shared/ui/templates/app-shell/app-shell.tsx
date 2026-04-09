"use client";

import React from "react";
import { Sidebar } from "@/shared/ui/organisms/navigation/sidebar";
import { TopNav } from "@/shared/ui/organisms/navigation/top-nav";
import { BottomNav } from "@/shared/ui/organisms/navigation/bottom-nav";
import { CreateListModal } from "@/features/collections/components/create-list-modal";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  return (
    <div className="flex bg-surface min-h-screen text-on-surface overflow-hidden">
      {/* Side Navigation - Desktop only */}
      <Sidebar onOpenCreateList={() => setIsCreateModalOpen(true)} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
        {/* Top Navigation - Shared, responsive internal logic */}
        <TopNav />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-6 md:px-10 pt-4 pb-32 md:pb-12 scroll-smooth">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        {/* Floating Action Button - Opens Create List Modal */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="fixed bottom-28 md:bottom-10 right-6 md:right-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed shadow-2xl shadow-primary/20 flex items-center justify-center active:scale-95 transition-all z-40 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="material-symbols-outlined text-3xl md:text-4xl font-bold">
            add
          </span>
        </button>

        {/* Modal Organism */}
        <CreateListModal
          isOpen={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />

        {/* Bottom Navigation - Mobile only */}
        <BottomNav />
      </div>
    </div>
  );
};
