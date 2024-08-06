import { Product } from "../Product";
import { PaginationModel } from "./pagination";


export interface ProductPagination {
    items: Product[];
    pagination: PaginationModel;
}

