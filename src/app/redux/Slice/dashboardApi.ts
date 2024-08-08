import { apiSlice } from "./apiSlice";
import { DASHBOARD_URL } from "../URL";
import { GraphDataSeries } from "../../../components/Dashboard/RevenueProfitCost";

const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInventoryTotal: builder.query<number, void>({
            query: () => ({
                url:`${DASHBOARD_URL}/InventoryTotal`,
                method: 'GET',
            }),
        }),
        getTopSellingProducts: builder.query({
            query: () => ({
                url:`${DASHBOARD_URL}/TopSellingProducts`,
                method: 'GET',
            }),
        }),
        getLowStockItems: builder.query({ 
            query: () => ({
                url:`${DASHBOARD_URL}/LowStockItems`,
                method: 'GET',
            }),
        }),
        getMonthlySalesTrends: builder.query({
            query: () => ({
                url:`${DASHBOARD_URL}/MonthlySalesTrends`,
                method: 'GET',
            }),
        }),
        getRevenueProfitCost: builder.query<GraphDataSeries[], void>({
            query: () => ({
                url:`${DASHBOARD_URL}/RevenueProfitCost`,
                method: 'GET',
            }),
        }),
        getDailyRevenueProfitCostForWeeks: builder.query({
            query: () => ({
                url:`${DASHBOARD_URL}/DailyRevenueProfitCostForWeeks`,
                method: 'GET',
            }),
        }),
    })
});

export const {
    useGetInventoryTotalQuery,
    useGetTopSellingProductsQuery,
    useGetLowStockItemsQuery,
    useGetMonthlySalesTrendsQuery,
    useGetRevenueProfitCostQuery,
    useGetDailyRevenueProfitCostForWeeksQuery,
} = dashboardApi;