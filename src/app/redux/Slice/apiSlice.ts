/* eslint-disable @typescript-eslint/no-unused-vars */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../URL";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl:BASE_URL, 
        prepareHeaders: (headers) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
            if(userInfo){
                headers.set('Authorization', `Bearer ${userInfo.token}`);
            }
            return headers;
        },  
    }),
    tagTypes: ["User","Product","Category", "Supplier", "OrderItem", "Order", "Customer"],
   
    endpoints: (_builder) => ({})
});