import {
  AppleIcon,
  SandwichIcon,
  CarrotIcon,
  BeefIcon,
  MilkIcon,
} from "lucide-react";

export const CategoryTag = ({ category = "fruit" }: { category: string }) => {
  const styleByCategory = {
    padaria: {
      bg: "bg-secondary/10",
      icon: SandwichIcon,
      color: "text-secondary",
      label: "Padaria",
    },
    legume: {
      bg: "bg-tertiary/10",
      icon: CarrotIcon,
      color: "text-tertiary",
      label: "Legumes",
    },
    fruta: {
      bg: "bg-primary/10",
      icon: AppleIcon,
      color: "text-primary",
      label: "Frutas",
    },
    bebida: {
      bg: "bg-blue-500/10",
      icon: MilkIcon,
      color: "text-blue-400",
      label: "Bebidas",
    },
    carne: {
      bg: "bg-error/10",
      icon: BeefIcon,
      color: "text-error",
      label: "Proteínas",
    },
  };

  const config = styleByCategory[category as keyof typeof styleByCategory] || styleByCategory.fruta;
  const { bg, icon: Icon, color, label } = config;

  return (
    <div
      className={`${bg} flex flex-row items-center px-4 py-1.5 rounded-xl gap-2.5 border border-white/5`}
    >
      <Icon className={color} size={14} />
      <span
        className={`${color} hidden md:block text-[10px] font-black uppercase tracking-[0.1em]`}
      >
        {label}
      </span>
    </div>
  );
};
