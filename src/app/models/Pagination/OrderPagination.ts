import { Order } from "../Order";
import { PaginationModel } from "./pagination";

export interface OrderPagination{
    items: Order[];
    pagination: PaginationModel;
}