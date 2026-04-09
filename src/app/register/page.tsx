import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="bg-background text-on-surface min-h-screen flex items-center justify-center p-0 lg:p-6 selection:bg-primary selection:text-on-primary">
      <div className="flex w-full max-w-6xl min-h-screen lg:min-h-[800px] overflow-hidden lg:rounded-[2rem] bg-surface-container-low shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]">
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/80"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold tracking-tighter mb-4 text-white">
              Lista de compras
            </h1>
            <div className="w-12 h-1 bg-primary mb-12"></div>
            <p className="text-3xl font-light leading-snug tracking-tight text-on-surface">
              Junte-se ao círculo selecionado de <br />
              <span className="text-primary font-bold italic">
                lista de compras.
              </span>
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-surface-container-high text-primary">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div>
                <h4 className="text-white font-bold tracking-tight">
                  Lista de compras inteligente
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Rastreamento preditivo da despensa com base nos seus hábitos
                  culinários.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-surface-container-high text-secondary">
                <span className="material-symbols-outlined">
                  restaurant_menu
                </span>
              </div>
              <div>
                <h4 className="text-white font-bold tracking-tight">
                  Receitas selecionadas
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Acesse um cofre digital de ingredientes adaptados ao seu
                  perfil de sabor.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center items-center bg-surface relative">
          <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-dim rounded-lg flex items-center justify-center">
              <span
                className="material-symbols-outlined text-white text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                restaurant_menu
              </span>
            </div>
            <h1 className="text-white font-bold text-xl tracking-tighter">
              Provisions
            </h1>
          </div>

          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
