import { ProductProps } from "@/types/product";
import { FirestoreTimestamp } from "@/types/shopping-list";

export interface CollectionCardProps {
    id: string;
    title: string;
    description: string;
    category: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    totalItems: number;
    securedItems: number;
    items: ProductProps[];
    lastModified: FirestoreTimestamp;
    onOpen?: () => void;
    className?: string;
}