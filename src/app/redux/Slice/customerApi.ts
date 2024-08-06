import { Customer } from "../../models/Customer";
import { CUSTOMER_URL } from "../URL";
import { apiSlice } from "./apiSlice";

const customerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query<Customer[], void>({
            query: ()=>({
                url:CUSTOMER_URL,
                method:'GET',
            })
        }),
        getCustomer: builder.query({
            query: (id: string) => ({
                url: `${CUSTOMER_URL}/${id}`,
                method: "GET",
            }),
        }),
        createCustomer: builder.mutation({
            query: (customer) => ({
                url: CUSTOMER_URL,
                method: "POST",
                body: customer,
            }),
        }),
        updateCustomer: builder.mutation({
            query: (customer) => ({
                url: `${CUSTOMER_URL}/${customer.id}`,
                method: "PUT",
                body: customer,
            }),
        }),
        deleteCustomer: builder.mutation({
            query: (id: string) => ({
                url: `${CUSTOMER_URL}/${id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetCustomersQuery,
    useGetCustomerQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} = customerApi;