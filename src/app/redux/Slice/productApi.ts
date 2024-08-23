import { Pagination } from "../../models/Pagination/pagination";
import { ProductPagination } from "../../models/Pagination/ProductPagination";
import { Product } from "../../models/Product";
import { PRODUCT_URL } from "../URL";
import { apiSlice } from "./apiSlice";



const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "GET",
                
            }),
            providesTags: ["Product"],
            keepUnusedDataFor: 5,
        }),
        getProducts: builder.query<ProductPagination, Pagination>({
            query: ({page , pageSize, searchTerm }) => ({
                url:PRODUCT_URL,
                method: "GET",
                params:{
                    page,
                    pageSize,
                    searchTerm
                },
            }),
            transformResponse: (response: Product[], meta) => {
                const pagination = JSON.parse(meta?.response?.headers.get('pagination') || '{}');
                return { items: response, pagination };
            },
            providesTags:["Product"],
            keepUnusedDataFor: 5    ,
        }),
        createProduct: builder.mutation({
            query: (body) => ({
                url: PRODUCT_URL,
                method: "POST",
                body,
            }),
        }),
        updateProduct: builder.mutation({
            query: (body) => ({
                url: `${PRODUCT_URL}/${body.id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "DELETE",
            }),
        }),
        getProductsByCategory: builder.query<ProductPagination ,{id:string,page:number,pageSize:number}>({
            query: ({id,page, pageSize}) => ({
                url: `${PRODUCT_URL}/category/${id}`,
                method: "GET",
                params:{
                    page,
                    pageSize,
                },
            }),
            transformResponse: (response: Product[], meta) => {
                const pagination = JSON.parse(meta?.response?.headers.get('pagination') || '{}');
                return { items: response, pagination };
            },
        }),
    }),
})

export const { 
    useGetProductQuery,
    useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductsByCategoryQuery,
} = productApi;