import { Customer } from "../../models/Customer";
import { CustomerPagination } from "../../models/Pagination/CustomerPagination";
import { Pagination } from "../../models/Pagination/pagination";
import { CUSTOMER_URL } from "../URL";
import { apiSlice } from "./apiSlice";

const customerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query<CustomerPagination, Pagination>({
            query: ({page, pageSize})=>({
                url:CUSTOMER_URL,
                method:'GET',
                params:{
                    page,
                    pageSize
                },
            }),
            transformResponse: (response: Customer[], meta) => {
                const pagination = JSON.parse(meta?.response?.headers.get('pagination') || '{}');
                return { items: response, pagination };
            }
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