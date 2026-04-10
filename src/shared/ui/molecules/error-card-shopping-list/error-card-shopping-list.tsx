"use client";

export const ErrorCardShoppingList = () => {
  return (
    <div className="text-center p-12 bg-surface-container-low rounded-3xl border border-error/20 flex flex-col items-center gap-4">
      <span className="material-symbols-outlined text-4xl text-error opacity-50">
        error
      </span>
      <p className="text-on-surface-variant font-bold uppercase tracking-widest text-[10px]">
        Não foi possível carregar as suas listas.
      </p>
    </div>
  );
};
