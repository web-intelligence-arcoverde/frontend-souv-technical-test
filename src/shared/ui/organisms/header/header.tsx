import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { RegisterProductForm } from "../register-product-form/register-product-form";

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="flex flex-col justify-between md:w-[720px] w-full mb-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-gray-100 font-family-inter font-bold text-2xl">
          Lista de compras
        </h1>
        {isAuthenticated && (
          <div className="flex items-center gap-6">
            <nav className="flex gap-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
              >
                Início
              </Link>
              <Link
                href="/admin/users"
                className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
              >
                Contas
              </Link>
            </nav>
            <div className="flex items-center gap-3 border-l border-gray-600 pl-6">
              <span className="text-gray-400 text-sm">
                Olá, <strong className="text-gray-200">{user?.name}</strong>
              </span>
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
                id="logout-button"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
      <RegisterProductForm />
    </header>
  );
};
