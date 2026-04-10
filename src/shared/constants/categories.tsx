"use client";

import {
  Beef,
  Carrot,
  Sandwich,
  Snowflake,
  Sparkles,
  Bath,
  Box,
  Egg,
  Wine,
  Utensils,
} from "lucide-react";
import React from "react";

export interface CategoryConfig {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: {
    bg: string;
    text: string;
    border: string;
  };
}

export const PRODUCT_CATEGORIES: Record<string, CategoryConfig> = {
  hortifruti: {
    value: "hortifruti",
    label: "Hortifruti",
    icon: <Carrot size={16} />,
    color: {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      border: "border-orange-500/20",
    },
  },
  acougue: {
    value: "acougue",
    label: "Açougue",
    icon: <Beef size={16} />,
    color: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/20",
    },
  },
  padaria: {
    value: "padaria",
    label: "Padaria",
    icon: <Sandwich size={16} />,
    color: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/20",
    },
  },
  frios: {
    value: "frios",
    label: "Frios",
    icon: <Egg size={16} />,
    color: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      border: "border-yellow-500/20",
    },
  },
  mercearia: {
    value: "mercearia",
    label: "Mercearia",
    icon: <Box size={16} />,
    color: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
    },
  },
  bebidas: {
    value: "bebidas",
    label: "Bebidas",
    icon: <Wine size={16} />,
    color: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20",
    },
  },
  congelados: {
    value: "congelados",
    label: "Congelados",
    icon: <Snowflake size={16} />,
    color: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      border: "border-cyan-500/20",
    },
  },
  higiene: {
    value: "higiene",
    label: "Higiene",
    icon: <Bath size={16} />,
    color: {
      bg: "bg-pink-500/10",
      text: "text-pink-400",
      border: "border-pink-500/20",
    },
  },
  limpeza: {
    value: "limpeza",
    label: "Limpeza",
    icon: <Sparkles size={16} />,
    color: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
    },
  },
  utilitarios: {
    value: "utilitarios",
    label: "Outros",
    icon: <Utensils size={16} />,
    color: {
      bg: "bg-slate-500/10",
      text: "text-slate-400",
      border: "border-slate-500/20",
    },
  },
};

export const CATEGORY_OPTIONS = Object.values(PRODUCT_CATEGORIES);
