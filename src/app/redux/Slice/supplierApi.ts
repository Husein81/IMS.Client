import { Pagination } from "../../models/Pagination/pagination";
import { ProductPagination } from "../../models/Pagination/ProductPagination";
import { SupplierPagination } from "../../models/Pagination/SupplierPagination";
import { Product } from "../../models/Product";
import { Supplier } from "../../models/Supplier";
import { SUPPLIER_URL } from "../URL";
import { apiSlice } from "./apiSlice";

type Props = {
    id: string;
    page:number;
    pageSize:number;
}
const supplierApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSupplier: builder.query<Supplier, string>({
            query: (id: string) => ({
                url: `${SUPPLIER_URL}/${id}`,
                method: "GET",
            }),
            providesTags: ["Supplier"],
            keepUnusedDataFor: 5,
        }),
        getSuppliers: builder.query<SupplierPagination, Pagination>({
            query: ({page, pageSize}) => ({
                url: SUPPLIER_URL,
                method: "GET",
                params: {
                    page,
                    pageSize,
                },
            }),
            transformResponse: (response: Supplier[], meta) => {
                const pagination = JSON.parse(meta?.response?.headers.get('pagination') || '{}');
                return { items: response, pagination };
            },
            providesTags:["Supplier"],
            keepUnusedDataFor: 5    ,
        }),
        createSupplier: builder.mutation({
            query: (body) => ({
                url: `${SUPPLIER_URL}`,
                method: "POST",
                body,
            }),
        }),
        updateSupplier: builder.mutation({
            query: (body) => ({
                url: `${SUPPLIER_URL}/${body.id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteSupplier: builder.mutation({
            query: (id: string) => ({
                url: `${SUPPLIER_URL}/${id}`,
                method: "DELETE",
            }),
        }),
        getSupplierProducts: builder.query<ProductPagination, Props>({
            query: ({id, page, pageSize}) => ({
                url: `${SUPPLIER_URL}/${id}/products`,
                method: "GET",
                params: {
                    page,
                    pageSize,
                },
            }),
            transformResponse: (response: Product[], meta) => {
                const pagination = JSON.parse(meta?.response?.headers.get('pagination') || '{}');
                return { items: response, pagination };
            },
            providesTags: ["Supplier"],
            keepUnusedDataFor: 5,
        }),
    }),
})

export const {
    useGetSupplierQuery,
    useGetSuppliersQuery,
    useCreateSupplierMutation,
    useUpdateSupplierMutation,
    useDeleteSupplierMutation,
    useGetSupplierProductsQuery,
} = supplierApi;