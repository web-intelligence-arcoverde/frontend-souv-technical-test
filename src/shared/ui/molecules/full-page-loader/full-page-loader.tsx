import React from "react";

interface FullPageLoaderProps {
  label?: string;
}

export const FullPageLoader = ({ label = "Carregando..." }: FullPageLoaderProps) => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-primary font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">
          {label}
        </p>
      </div>
    </div>
  );
};
