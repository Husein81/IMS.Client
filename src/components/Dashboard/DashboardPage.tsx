import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import {
  AttachMoney,
  Inventory,
  MoneyOff,
  TrendingUp,
} from "@mui/icons-material";
import RevenueProfitCost from "./RevenueProfitCost";
import WeeklyRevenueProfitCost from "./DailyRevenueProfitCostForWeeks";
import DashboardList from "./DashboardList";
import TopSellingProducts from "./TopSellingProducts";
import LowStockItems from "./LowStockItems";
import Loader from "../Other/Loader";
import NavBar from "../Other/NavBar";
import {
  useGetDailyRevenueProfitCostForWeeksQuery,
  useGetLowStockItemsQuery,
  useGetRevenueProfitCostQuery,
  useGetTopSellingProductsQuery,
} from "../../app/redux/Slice/dashboardApi";
import { useGetCompletedOrdesQuery } from "../../app/redux/Slice/orderApi";

export interface DashboardCardProps {
  title: string;
  value: number | string;
  icon?: JSX.Element;
}

const DashboardPage: React.FC = () => {
  const [viewType, setViewType] = useState<"daily" | "monthly">("daily");

  const currentMonthRef = useRef<number>(new Date().getMonth());
  const currentDayRef = useRef<number>(new Date().getDay() - 1);

  const {
    data: revenueProfitCost,
    isLoading: isLoadingMonthly,
    refetch: refetchMonthly,
  } = useGetRevenueProfitCostQuery();

  const {
    data: dailyRevenueProfitCostForWeeks,
    isLoading: isLoadingDaily,
    refetch: refetchDaily,
  } = useGetDailyRevenueProfitCostForWeeksQuery({});

  const { data: lowStockItems, refetch: refetchLowStock } =
    useGetLowStockItemsQuery({});

  const { data: topSellingProducts, refetch: refetchTopSelling } =
    useGetTopSellingProductsQuery({});

  const { data: inventoryTotal } = useGetCompletedOrdesQuery({
    page: 1,
    pageSize: 1000000,
  });

  // Monthly Revenue, Profit, and Cost
  const revenueMonthly =
    revenueProfitCost?.[0].data[currentMonthRef.current]?.y?.toFixed(2) ?? 0;
  const profitMonthly =
    revenueProfitCost?.[2]?.data[currentMonthRef.current]?.y?.toFixed(2) ?? 0;
  const costMonthly =
    revenueProfitCost?.[1]?.data[currentMonthRef.current]?.y?.toFixed(2) ?? 0;

  // Daily Revenue, Profit, and Cost
  const revenueDaily =
    dailyRevenueProfitCostForWeeks?.[0].data[currentDayRef.current]?.y?.toFixed(
      2
    ) ?? 0;
  const profitDaily =
    dailyRevenueProfitCostForWeeks?.[2].data[currentDayRef.current]?.y?.toFixed(
      2
    ) ?? 0;
  const costDaily =
    dailyRevenueProfitCostForWeeks?.[1].data[currentDayRef.current]?.y?.toFixed(
      2
    ) ?? 0;

  const revenue = viewType === "monthly" ? revenueMonthly : revenueDaily;
  const profit = viewType === "monthly" ? profitMonthly : profitDaily;
  const cost = viewType === "monthly" ? costMonthly : costDaily;

  const contents: DashboardCardProps[] = [
    {
      title: "Number of Sales",
      value: inventoryTotal?.items.length || 0,
      icon: <Inventory />,
    },
    {
      title: "Revenue",
      value: revenue,
      icon: <AttachMoney color="primary" />,
    },
    { title: "Profit", value: profit, icon: <TrendingUp color="success" /> },
    { title: "Cost", value: cost, icon: <MoneyOff color="error" /> },
  ];

  // Refetch when the view type changes
  useEffect(() => {
    if (viewType === "monthly") {
      refetchMonthly();
    } else {
      refetchDaily();
    }
  }, [viewType, refetchMonthly, refetchDaily]);

  // Refetch low stock and top selling products on mount
  useEffect(() => {
    refetchLowStock();
    refetchTopSelling();
  }, [refetchLowStock, refetchTopSelling]);

  if (isLoadingMonthly || isLoadingDaily) return <Loader />;

  return (
    <Container>
      <NavBar title="Dashboard" />
      <Box pt={2} display={"flex"} justifyContent={"flex-end"}>
        <Box display={"flex"} justifyContent={"space-between"} gap={1}>
          <Button
            variant="contained"
            onClick={() => setViewType("daily")}
            sx={{ py: 1 }}
          >
            Daily
          </Button>
          <Button
            variant="contained"
            onClick={() => setViewType("monthly")}
            sx={{ py: 1 }}
          >
            Monthly
          </Button>
        </Box>
      </Box>
      <Box pt={2}>
        <DashboardList contents={contents} />
      </Box>
      <Paper sx={{ height: 450, p: 2, mt: 1, bgcolor: "#fefefe" }}>
        <Box px={1} display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h4" align="left">
            Revenue, Profit, and Cost
          </Typography>
        </Box>
        <Box height={400}>
          {viewType === "monthly" ? (
            <RevenueProfitCost
              isLoading={isLoadingMonthly}
              data={revenueProfitCost || [{ id: "", data: [{ x: "", y: 0 }] }]}
            />
          ) : (
            <WeeklyRevenueProfitCost
              isLoading={isLoadingDaily}
              data={
                dailyRevenueProfitCostForWeeks || [
                  { id: "", data: [{ x: "", y: 0 }] },
                ]
              }
            />
          )}
        </Box>
      </Paper>
      <Box py={2} className="grid grid-cols-2 gap-2">
        <TopSellingProducts data={topSellingProducts || []} />
        <LowStockItems data={lowStockItems || []} />
      </Box>
    </Container>
  );
};

export default DashboardPage;
