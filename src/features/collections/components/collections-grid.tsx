"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  CollectionCard,
  CollectionCardProps,
} from "@/shared/ui/molecules/collection-card/collection-card";

const MOCK_COLLECTIONS: CollectionCardProps[] = [
  {
    title: "Essenciais da Semana",
    description: "Reposição rotineira para a despensa da casa.",
    category: "Carnes e Laticínios",
    variant: "primary",
    totalItems: 12,
    securedItems: 8,
    lastModified: "há 2h",
    previews: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfRh5m2iWjDEUKceVSPr53kzps3wCNXP6e9Pazs3a3ElbHaLV2C8V33x8fRhtKJ07LftarVsslW7-bK6IC4vURgaJc2TeuUoaz4YNoZjnLt-RULdxgB_02nUen1-nxrCNsDhWNtwXuSyR9A3uk7t8P14_obSCEdZjGVsdl9xV6JUjF1JFi3EOVucB89Y4c5rIhM9jIsJiUNI1Ui6lzJjW-8kk9EZJJPbfJar1UY4Hf889BBTTU3R74bTzR8bbI1fnDS0XD9PyawiE",
    ],
    items: [
      { id: "1", name: "Ovos Orgânicos", icon: "egg", quantity: "2 dz" },
      { id: "2", name: "Leite Integral", icon: "water_drop", quantity: "1 L" },
      { id: "3", name: "Peito de Frango", icon: "flatware", quantity: "3 kg" },
    ],
  },
  {
    title: "Fim de Semana Gourmet",
    description: "Ingredientes especiais para o jantar de sábado.",
    category: "Padaria e Gastronomia",
    variant: "secondary",
    totalItems: 8,
    securedItems: 5,
    lastModified: "Ontem",
    previews: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCzB4kqtUMt1969WgP5kNwYrg3qC2bL-sfFDFNngZbgDWIqDKG5TzYcqE9oY3owbaWfe58fROSfgjyGFKDSgp9vtg_CcwvspRArwvi_gYYF2-6eZTJfh8eftF4mTGPfzmWf66gQ98HsDKg5gQN0ow0D31MxfH3lCpe56Ix80pohXRXnu-uWrihEJzkwar5u8ysnCXZoWVgjVAshwOMQaXIRS_CBVrfgu6l28OImNKAZ29ixoGeljZLt9MGAHbS6GTdDDSUogLr_1ak",
    ],
    items: [
      {
        id: "1",
        name: "Pão de Fermentação Natural",
        icon: "bakery_dining",
        quantity: "2 un",
      },
      {
        id: "2",
        name: "Manteiga com Trufas",
        icon: "set_meal",
        quantity: "150g",
      },
      {
        id: "3",
        name: "Pistilos de Açafrão",
        icon: "nutrition",
        quantity: "1g",
      },
    ],
  },
  {
    title: "Vinhos e Queijos",
    description: "Seleção curada para a noite de sexta-feira.",
    category: "Adega e Queijos",
    variant: "tertiary",
    totalItems: 5,
    securedItems: 5,
    lastModified: "há 3 dias",
    previews: [],
    items: [
      {
        id: "1",
        name: "Pinot Noir Safra Especial",
        icon: "liquor",
        quantity: "3 gfa",
      },
      { id: "2", name: "Manchego Curado", icon: "chess", quantity: "400g" },
      {
        id: "3",
        name: "Gorgonzola Dolce",
        icon: "lunch_dining",
        quantity: "250g",
      },
    ],
  },
  {
    title: "Colheita Saudável",
    description: "Verduras frescas e grãos a granel para marmitas.",
    category: "Legumes e Verduras",
    variant: "tertiary",
    totalItems: 18,
    securedItems: 12,
    lastModified: "24 de Out",
    previews: [],
    items: [
      { id: "1", name: "Espinafre Baby", icon: "eco", quantity: "500g" },
      { id: "2", name: "Quinoa Branca", icon: "grain", quantity: "2 kg" },
      {
        id: "3",
        name: "Amêndoas Cruas",
        icon: "potted_plant",
        quantity: "1 kg",
      },
    ],
  },
];

export const CollectionsGrid = () => {
  const router = useRouter();

  const handleOpenList = () => {
    router.push("/products");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {MOCK_COLLECTIONS.map((collection, index) => (
        <CollectionCard 
          key={index} 
          {...collection} 
          onOpen={handleOpenList}
        />
      ))}
    </div>
  );
};
