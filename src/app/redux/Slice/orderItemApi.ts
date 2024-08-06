import { ORDERITEM_URL } from "../URL";
import { apiSlice } from "./apiSlice";

const orderItemApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrderItems: builder.query({
            query: () => ({
                url:ORDERITEM_URL,
                method: "GET",
            }),
        }),
        getOrderItem: builder.query({
            query: (id: string) => ({
                url: `${ORDERITEM_URL}/${id}`,
                method: "GET",
            }),
        }),
        createOrderItem: builder.mutation({
            query: (orderItem) => ({
                url: ORDERITEM_URL,
                method: "POST",
                body: orderItem,
            }),
        }),
        updateOrderItem: builder.mutation({
            query: (orderItem) => ({
                url: `${ORDERITEM_URL}/${orderItem.id}`,
                method: "PUT",
                body: orderItem,
            }),
            
        }),
        deleteOrderItem: builder.mutation({
            query: (id: string) => ({
                url: `${ORDERITEM_URL}/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { 
    useGetOrderItemsQuery,
    useGetOrderItemQuery,
    useUpdateOrderItemMutation,
    useDeleteOrderItemMutation, 
    useCreateOrderItemMutation 
} = orderItemApi;