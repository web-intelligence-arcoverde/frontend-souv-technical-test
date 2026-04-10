"use client";

export const SkeletonCardShoppingList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="h-[400px] bg-surface-container-low rounded-3xl animate-pulse border border-white/5"
        />
      ))}
    </div>
  );
};
