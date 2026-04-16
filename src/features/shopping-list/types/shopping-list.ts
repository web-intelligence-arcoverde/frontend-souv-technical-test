import type { ProductProps } from "./product";

export interface FirestoreTimestamp {
	_seconds: number;
	_nanoseconds: number;
}

export interface IShoppingList {
	id: string;
	title: string;
	description: string;
	category: string;
	variant: "primary" | "secondary" | "tertiary";
	totalItems: number;
	securedItems: number;
	items: ProductProps[];
	ownerId: string;
	shared: boolean;
	lastModified: FirestoreTimestamp;
	createdAt: FirestoreTimestamp;
}
