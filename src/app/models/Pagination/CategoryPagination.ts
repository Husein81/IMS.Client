import { Category } from "../Category";
import { PaginationModel } from "./pagination";

export interface CategoryPagination{
    items: Category[];
    pagination: PaginationModel;
}