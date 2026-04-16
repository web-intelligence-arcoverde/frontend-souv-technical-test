import { useRouter, useSearchParams } from "next/navigation";
import { useGetShoppingListDetail } from "@/features/shopping-list";

export const HeaderProductItemList = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const listId = searchParams.get("listId");
	const { data: list } = useGetShoppingListDetail(listId);

	return (
		<header className="mb-14">
			<div
				className="flex items-center gap-4 mb-6 group cursor-pointer w-fit"
				onClick={() => router.push("/")}
			>
				<div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
					<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
						arrow_back
					</span>
				</div>
				<span className="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant/60 group-hover:text-primary transition-colors">
					Voltar ao Dashboard
				</span>
			</div>

			<h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter mb-4 leading-none">
				{list?.title}
			</h1>
			<p className="text-on-surface-variant text-lg font-medium opacity-70 tracking-tight max-w-2xl">
				{list?.description}
			</p>
		</header>
	);
};
