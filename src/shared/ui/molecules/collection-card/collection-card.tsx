import type React from "react";
import { useDeleteShoppingList } from "@/hooks/use-delete-shopping-list";
import { useToast } from "@/hooks/use-toast";
import { formatRelativeTime } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/atoms/Button/Button";
import { Badge } from "@/shared/ui/atoms/badge/badge";
import { ProgressBar } from "@/shared/ui/atoms/progress-bar/progress-bar";
import type { CollectionCardProps } from "./collection-card.interface";

export const CollectionCard = ({
	id,
	title,
	description,
	category,
	variant,
	totalItems,
	securedItems,
	items,
	lastModified,
	onOpen,
	className,
}: CollectionCardProps) => {
	const { toast } = useToast();
	const { mutate: deleteList, isPending: isDeleting } = useDeleteShoppingList();
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

	const handleShare = async (e: React.MouseEvent) => {
		e.stopPropagation();
		const shareUrl = `${window.location.origin}/shared/${id}`;

		const onSuccess = () => {
			toast({
				title: "Link copiado!",
				description: "O link da lista foi copiado para seu clipboard.",
			});
		};

		const fallbackCopy = (text: string) => {
			const textArea = document.createElement("textarea");
			textArea.value = text;
			textArea.style.position = "fixed";
			textArea.style.left = "-999999px";
			textArea.style.top = "-999999px";
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				const successful = document.execCommand("copy");
				if (successful) onSuccess();
			} catch (err) {
				console.error("Fallback: Erro ao copiar", err);
			}
			document.body.removeChild(textArea);
		};

		try {
			if (navigator && navigator.clipboard) {
				await navigator.clipboard.writeText(shareUrl);
				onSuccess();
			} else {
				fallbackCopy(shareUrl);
			}
		} catch {
			fallbackCopy(shareUrl);
		}
	};

	return (
		<div
			onClick={() => onOpen?.()}
			className={cn(
				"bg-surface-container-low rounded-3xl p-8 group hover:bg-surface-container-high transition-all duration-500 relative overflow-hidden flex flex-col h-full border border-white/5 hover:border-white/10 shadow-xl hover:shadow-2xl",
				className,
			)}
		>
			<div className="absolute top-4 right-4 z-20">
				<Button
					variant="ghost"
					size="icon"
					onClick={handleShare}
					className="rounded-full w-10 h-10 text-on-surface-variant hover:bg-error/10 hover:text-error transition-all "
				>
					<span className="material-symbols-outlined text-xl">share</span>
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onClick={(e) => {
						e.stopPropagation();
						if (confirm("Tem certeza que deseja excluir esta lista?")) {
							deleteList(id);
						}
					}}
					isLoading={isDeleting}
					className="rounded-full w-10 h-10 text-on-surface-variant hover:bg-error/10 hover:text-error transition-all "
				>
					<span className="material-symbols-outlined text-xl">delete</span>
				</Button>
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

			<div className="space-y-4 mb-8 flex-1">
				{items.slice(0, 3).map((item) => (
					<div
						key={item.id || Math.random()}
						className="flex items-center justify-between text-sm group/item"
					>
						<div className="flex items-center gap-3">
							<span
								className={cn(
									"material-symbols-outlined text-lg opacity-80",
									accentColors[variant],
								)}
							>
								shopping_cart
							</span>
							<span className="text-on-surface/70 group-hover/item:text-on-surface transition-colors">
								{item.name}
							</span>
						</div>
						<span className="text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
							{item.quantity} {item.unit}
						</span>
					</div>
				))}
			</div>

			<div className="space-y-3 mb-8">
				<div className="flex items-center justify-between">
					<span className="text-[10px] font-black text-on-surface-variant tracking-[0.2em] uppercase">
						{isCompleted
							? "Despensa Completa"
							: `${securedItems} de ${totalItems} obtidos`}
					</span>
					<span className={cn("text-xs font-black", accentColors[variant])}>
						{isCompleted ? "CONCLUÍDO" : `${Math.round(progress)}%`}
					</span>
				</div>
				<ProgressBar value={progress} variant={variant} />
			</div>

			<div className="flex items-center justify-between mt-auto pt-6 border-t border-outline-variant/10">
				<div className="text-[10px] text-on-surface-variant/80 font-bold">
					<span className="block uppercase tracking-wider">Modificado</span>
					<span className="block uppercase tracking-widest text-on-surface-variant">
						{formatRelativeTime(lastModified)}
					</span>
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
