import { Supplier } from "../Supplier";
import { PaginationModel } from "./pagination";

export interface SupplierPagination {
    items: Supplier[];
    pagination: PaginationModel;
}