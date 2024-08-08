import { Customer } from "../Customer";
import { PaginationModel } from "./pagination";

export interface CustomerPagination {
    items: Customer[];
    pagination: PaginationModel;
}