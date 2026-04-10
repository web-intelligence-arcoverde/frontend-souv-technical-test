import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
	return (
		<main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center selection:bg-primary selection:text-on-primary overflow-x-hidden">
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]"></div>
				<div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px]"></div>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0e0e0e_100%)]"></div>
			</div>

			<div className="relative z-10 w-full max-w-[440px] px-6 py-12 flex flex-col items-center">
				<div className="flex flex-col items-center mb-10 text-center">
					<div className="w-20 h-20 bg-surface-container-high rounded-2xl flex items-center justify-center mb-6 border border-outline-variant/20 shadow-xl">
						<span
							className="material-symbols-outlined text-primary text-6xl"
							style={{ fontVariationSettings: "'FILL' 1" }}
						>
							restaurant_menu
						</span>
					</div>
				</div>

				<LoginForm />

				<footer className="mt-12 text-center text-[10px] text-outline font-label uppercase tracking-[0.3em] opacity-50">
					© {new Date().getFullYear()} Web Intelligence - Arcoverde
				</footer>
			</div>
		</main>
	);
}
