import { User } from "../../models/User";
import { LOGIN_URL, REGISTER_URL } from "../URL";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, User>({
            query: (body: User) => ({
                url: LOGIN_URL,
                method: "POST",
                body
            })
        }),
        register: builder.mutation({
            query: (body: User) => ({
                url: REGISTER_URL,
                method:"POST",
                body
            }),
        })
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = userApi;

