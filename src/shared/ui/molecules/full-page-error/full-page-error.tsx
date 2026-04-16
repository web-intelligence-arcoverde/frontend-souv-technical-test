import React from "react";
import { Button } from "@/components/ui/button";

interface FullPageErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const FullPageError = ({
  title = "Algo deu errado!",
  message = "Não foi possível carregar as informações desta página.",
  onRetry,
}: FullPageErrorProps) => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="flex flex-col items-center text-center max-w-sm gap-6 p-12 bg-surface-container-low rounded-3xl border border-error/10 shadow-2xl shadow-error/5">
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mb-2">
          <span className="material-symbols-outlined text-5xl text-error">
            error
          </span>
        </div>
        
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black text-on-surface tracking-tight">
            {title}
          </h2>
          <p className="text-on-surface-variant font-medium text-sm leading-relaxed opacity-70">
            {message}
          </p>
        </div>

        {onRetry && (
          <Button 
            variant="default" 
            onClick={onRetry}
            className="w-full mt-4 h-12 rounded-2xl font-bold bg-error text-white hover:bg-error/90 border-none transition-all"
          >
            Tentar Novamente
          </Button>
        )}
      </div>
    </div>
  );
};
