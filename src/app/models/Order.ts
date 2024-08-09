import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

export interface Order{
    id?: string;
    orderStatus?: string;
    payment:number;
    shippingAddress?: string;
    orderItems: OrderItem[];
    itemsPrice: number ;
    discount: number;
    totalAmount: number 
    customerId: string;
    customer?: Customer;
    createdAt?: string;
    updatedAt?: string;

}