import { Category } from "../../models/Category";
import { CategoryPagination } from "../../models/Pagination/CategoryPagination";
import { Pagination } from "../../models/Pagination/pagination";
import { CATEGORY_URL } from "../URL";
import { apiSlice } from "./apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryPagination, Pagination>({
      query: ({ page, pageSize }) => ({
        url: CATEGORY_URL,
        method: "GET",
        params: {
          page,
          pageSize,
        },
      }),
      transformResponse: (response: Category[], meta) => {
        const pagination = JSON.parse(
          meta?.response?.headers.get("pagination") || "{}"
        );
        return { items: response, pagination };
      },
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    getCategory: builder.query({
      query: (id: string) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: category,
      }),
    }),
    updateCategory: builder.mutation({
      query: (category) => ({
        url: `${CATEGORY_URL}/${category.id}`,
        method: "PUT",
        body: category,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
