import { Order } from "../../models/Order";
import { OrderPagination } from "../../models/Pagination/OrderPagination";
import { Pagination } from "../../models/Pagination/pagination";
import { ORDER_URL } from "../URL";
import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getOrders: builder.query<OrderPagination, Pagination>({
            query: ({page, pageSize, searchTerm }) => ({
                url: ORDER_URL,
                method: "GET",
                params:{
                    page,
                    pageSize,
                    searchTerm
                }
            }),
            transformResponse: (response: Order[], meta) => {
                const pagination = JSON.parse(meta?.response?.headers.get('pagination') || '{}');
                return { items: response, pagination };
            },
            providesTags: ["Order"],
            keepUnusedDataFor: 5,
        }),
        getOrder: builder.query<Order, string>({
            query: (id: string) => ({
                url: `${ORDER_URL}/${id}`,
                method: "GET",
            }),
            providesTags: ["Order"],
            keepUnusedDataFor: 5,
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDER_URL,
                method: "POST",
                body: order,
            }),
        }),
        updateOrder: builder.mutation({
            query: (order) => ({
                url: `${ORDER_URL}/${order.id}`,
                method: "PUT",
                body: order,
            }),
        }),
        deleteOrder: builder.mutation({
            query: (id: string) => ({
                url: `${ORDER_URL}/${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = orderApi;
