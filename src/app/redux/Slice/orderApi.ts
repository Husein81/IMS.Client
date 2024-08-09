import { Order } from "../../models/Order";
import { OrderPagination } from "../../models/Pagination/OrderPagination";
import { Pagination } from "../../models/Pagination/pagination";
import { ORDER_URL } from "../URL";
import { apiSlice } from "./apiSlice";

type OrderStatus ={ 
    id:string;
    orderStatus: string;
}
type OrderPayment = {
    id: string;
    payment: number;
}
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
        getCompletedOrdes: builder.query<OrderPagination, Pagination>({
            query: ({page, pageSize, searchTerm }) => ({
                url: `${ORDER_URL}/CompletedOrders`,
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
        createOrder: builder.mutation<Order, Order>({
            query: (order) => ({
                url: ORDER_URL,
                method: "POST",
                body: order,
            }),
        }),
        updateOrder: builder.mutation<Order, Order>({
            query: (body) => ({
                url: `${ORDER_URL}/${body.id}`,
                method: "PUT",
                body,
            }),
        }),
        updateOrderStatus: builder.mutation<Order, OrderStatus>({
            query: ({id, orderStatus}) => ({
                url: `${ORDER_URL}/${id}/status`,
                method: "PUT",
                body:{orderStatus},
            }),
        }),
        updateOrderPayment: builder.mutation<Order, OrderPayment>({
            query: ({id, payment}) => ({
                url: `${ORDER_URL}/${id}/payment`,
                method: "PUT",
                body:{payment},
            }),
        }),
        deleteOrder: builder.mutation<void, string>({
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
    useDeleteOrderMutation,
    useUpdateOrderStatusMutation,
    useGetCompletedOrdesQuery,
    useUpdateOrderPaymentMutation
} = orderApi;
