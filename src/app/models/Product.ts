import { Category } from "./Category";
import { Supplier } from "./Supplier";

export interface Product {
    id?: string;
    name: string;
    description: string;
    cost: number;
    price?: number;
    currency?: string;
    quantity: number;
    imageUrls: string[];
    categoryId: string;
    category?: Category; 
    supplierId: string;
    supplier?: Supplier;
    createdAt?: string;
    updatedAt?: string;
}