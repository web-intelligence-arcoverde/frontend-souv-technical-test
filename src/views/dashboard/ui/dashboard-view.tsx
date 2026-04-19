import { CollectionsGrid } from "@/features/shopping-list";
import { AppShell } from "@/shared/ui/templates/app-shell/app-shell";

export const DashboardView = () => {
  return (
    <AppShell>
      <header className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter mb-4 leading-none">
            Minhas Listas
          </h1>
          <p className="text-on-surface-variant text-lg font-medium opacity-70 tracking-tight max-w-2xl">
            Gerencie e organize suas listas de compras.
          </p>
        </div>
      </header>

      <CollectionsGrid />
    </AppShell>
  );
};
