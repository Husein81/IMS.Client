export interface Pagination{
    page: number;
    pageSize: number;
    searchTerm?: string;
}

export interface PaginationModel {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}