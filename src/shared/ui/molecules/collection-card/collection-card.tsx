import React from "react";
import { Badge } from "@/shared/ui/atoms/badge/badge";
import { ProgressBar } from "@/shared/ui/atoms/progress-bar/progress-bar";
import { Button } from "@/shared/ui/atoms/Button/Button";
import { AvatarStack } from "@/shared/ui/atoms/avatar-stack/avatar-stack";
import { cn } from "@/lib/utils";

export interface CollectionItem {
  id: string;
  name: string;
  icon: string;
  quantity: string;
}

export interface CollectionCardProps {
  title: string;
  description: string;
  category: string;
  variant: "primary" | "secondary" | "tertiary";
  totalItems: number;
  securedItems: number;
  items: CollectionItem[];
  previews: string[];
  lastModified: string;
  onOpen?: () => void;
  className?: string;
}

export const CollectionCard = ({
  title,
  description,
  category,
  variant,
  totalItems,
  securedItems,
  items,
  previews,
  lastModified,
  onOpen,
  className,
}: CollectionCardProps) => {
  const progress = (securedItems / totalItems) * 100;
  const isCompleted = securedItems === totalItems;

  const accentColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
  };

  const badgeVariants = {
    primary: "default" as const,
    secondary: "secondary" as const,
    tertiary: "tertiary" as const,
  };

  return (
    <div
      className={cn(
        "bg-surface-container-low rounded-3xl p-8 group hover:bg-surface-container-high transition-all duration-500 relative overflow-hidden flex flex-col h-full border border-white/5 hover:border-white/10 shadow-xl hover:shadow-2xl",
        className
      )}
    >
      {/* Background Icon Accent */}
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110 pointer-events-none">
        <span className="material-symbols-outlined text-8xl">
          {category.toLowerCase().includes("meat") ? "local_grocery_store" : 
           category.toLowerCase().includes("bakery") ? "restaurant" : 
           category.toLowerCase().includes("wine") ? "wine_bar" : "spa"}
        </span>
      </div>

      <div className="mb-8">
        <Badge variant={badgeVariants[variant]}>{category}</Badge>
        <h3 className="text-2xl font-bold mt-4 text-on-surface tracking-tight group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-on-surface-variant text-sm mt-2 line-clamp-1 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Items Preview (Desktop List Style) */}
      <div className="space-y-4 mb-8 flex-1">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm group/item">
            <div className="flex items-center gap-3">
              <span className={cn("material-symbols-outlined text-lg opacity-80", accentColors[variant])}>
                {item.icon}
              </span>
              <span className="text-on-surface/70 group-hover/item:text-on-surface transition-colors">
                {item.name}
              </span>
            </div>
            <span className="text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
              {item.quantity}
            </span>
          </div>
        ))}

        {/* For Mobile/Compact consistency - show avatars if many items */}
        {items.length > 3 && (
          <div className="pt-2">
            <AvatarStack images={previews} remainingCount={totalItems - 3} />
          </div>
        )}
      </div>

      {/* Progress Section */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-on-surface-variant tracking-[0.2em] uppercase">
            {isCompleted ? "Despensa Completa" : `${securedItems} de ${totalItems} obtidos`}
          </span>
          <span className={cn("text-xs font-black", accentColors[variant])}>
            {isCompleted ? "CONCLUÍDO" : `${Math.round(progress)}%`}
          </span>
        </div>
        <ProgressBar value={progress} variant={variant} />
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-outline-variant/10">
        <div className="text-[10px] text-on-surface-variant/80 font-bold">
          <span className="block uppercase tracking-wider">Modificado</span>
          <span className="block uppercase tracking-widest text-on-surface-variant">{lastModified}</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpen}
          className="rounded-xl px-6 h-9 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Abrir Lista
        </Button>
      </div>
    </div>
  );
};
