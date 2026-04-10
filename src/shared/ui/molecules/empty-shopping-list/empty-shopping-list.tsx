"use client";

export const EmptyShoppingList = () => {
  return (
    <div className="text-center p-16 bg-surface-container-low rounded-3xl border border-white/5 flex flex-col items-center gap-6 group hover:bg-surface-container-high transition-all">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-4xl text-primary">
          shopping_basket
        </span>
      </div>
      <div className="space-y-2">
        <p className="text-on-surface font-black uppercase tracking-[0.2em] text-xs">
          Sua despensa está vazia
        </p>
        <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">
          Crie sua primeira lista para começar
        </p>
      </div>
    </div>
  );
};
