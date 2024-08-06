import { Product } from "./Product";

export interface OrderItem{
    id: string;
    name: string;
    qty: number;
    price: number;
    discount: number;
    productId: string;
    product?: Product;
}