import { Box, Button, Container, Paper, Typography } from "@mui/material"
import RevenueProfitCost from "./RevenueProfitCost";
import { useGetDailyRevenueProfitCostForWeeksQuery, useGetInventoryTotalQuery, useGetLowStockItemsQuery, useGetRevenueProfitCostQuery, useGetTopSellingProductsQuery } from "../../app/redux/Slice/dashboardApi";
import { AttachMoney, Inventory, MoneyOff, TrendingUp } from "@mui/icons-material";
import DashboardList from "./DashboardList";
import TopSellingProducts from "./TopSellingProducts";
import LowStockItems from "./LowStockItems";
import WeeklyRevenueProfitCost from "./DailyRevenueProfitCostForWeeks";
import { useEffect, useState } from "react";
import { useGetCompletedOrdesQuery } from "../../app/redux/Slice/orderApi";
import Loader from "../OtherComponents/Loader";
import NavBar from "../OtherComponents/NavBar";

export interface DashboardCardProps {
  title: string;
  value: number | string;
  icon?:JSX.Element;
}
const DashboardPage = () => {

  const {data: revenueProfitCost, isLoading:isLoadingMonthly, refetch:refetchMonthly} = useGetRevenueProfitCostQuery();
  const {data: dailyRevenueProfitCostForWeeks, isLoading:isLoadingDaily, refetch:refetchDaily} = useGetDailyRevenueProfitCostForWeeksQuery({});
  const {data: lowStockItems, refetch: refetchLowStock} = useGetLowStockItemsQuery({});
  const {data: topSellingProducts, refetch:refetchTopSelling} = useGetTopSellingProductsQuery({});
  const {data: inventoryTotalvalue, refetch:refetchInventoryTotalValue} = useGetInventoryTotalQuery();
  const {data: inventoryTotal} = useGetCompletedOrdesQuery({
    page: 1, 
    pageSize: 1000000,
  });

  const [toggle, setToggle] = useState(false);

  const monthHandler = () => {
    setToggle(true);
  }
  const dailyHandler = () => {
    setToggle(false);
  }

  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDay() - 1;

  const inventoryValue = inventoryTotalvalue?.toFixed(2) || 0;

  //Monthly Revenue, Profit and Cost
  const revenueMonthly = (revenueProfitCost?.[0].data[currentMonth]?.y)?.toFixed(2) || 0;
  const profitMonthly = (revenueProfitCost?.[2]?.data[currentMonth]?.y)?.toFixed(2) || 0;
  const costMonthly = (revenueProfitCost?.[1]?.data[currentMonth]?.y)?.toFixed(2) || 0;
  
  //Daily Revenue, Profit and Cost
  const revenueDaily = (dailyRevenueProfitCostForWeeks?.[0].data[currentDay]?.y)?.toFixed(2) ;
  const profitDaily = (dailyRevenueProfitCostForWeeks?.[2]?.data[currentDay]?.y)?.toFixed(2) 
  const costDaily = (dailyRevenueProfitCostForWeeks?.[1]?.data[currentDay]?.y)?.toFixed(2) 

  const revenue = toggle ? revenueMonthly : revenueDaily;
  const profit = toggle ? profitMonthly : profitDaily;
  const cost = toggle ? costMonthly : costDaily;

  const contents: DashboardCardProps[] = [
    {title:'Revenue', value: revenue, icon: <AttachMoney color={"action"} />},
    {title:'Profit', value: profit , icon: <TrendingUp color={'success'}/>},
    {title:'Cost', value: cost, icon: <MoneyOff color={"error"} />},
    {title:'Inventory Total Value ', value: inventoryValue, icon: <Inventory/>},
    {title:"Inventory Total", value: inventoryTotal?.items.length || 0, icon: <Inventory/>}
    
  ];

  useEffect(() => {
    refetchMonthly();
    refetchDaily();
    refetchLowStock();
    refetchTopSelling();
    refetchInventoryTotalValue();
  }, [refetchMonthly, refetchDaily, refetchLowStock, refetchTopSelling, refetchInventoryTotalValue]);
  
  if(isLoadingMonthly || isLoadingDaily) return <Loader color="blue" />;

  return (
    <Container>
      <NavBar/>
      <Box pt={2} display={'flex'} justifyContent={'space-between'}>
          <Typography variant='h3' gutterBottom>Dashboard</Typography>
          <Box display={'flex'} justifyContent={'space-between'} gap={1}>
            <Button variant="contained" onClick={dailyHandler}>Daily</Button>
            <Button variant="contained" onClick={monthHandler}>Monthly</Button>
          </Box>
      </Box>
      <Box pt={2}>
        <DashboardList contents={contents}/>
      </Box>
      <Paper sx={{height:450,p:2,mt:1, bgcolor:'#fefefe'}}>
        <Box px={1} display={'flex'} justifyContent={'space-between'}> 
            <Typography variant='h4' align='left'>Revenue, Profit and Cost</Typography>
            
        </Box>
        <Box height={400}>
          {toggle ?
            <RevenueProfitCost 
              isLoading={isLoadingMonthly}
              data={revenueProfitCost || []}
            /> 
            : 
            <WeeklyRevenueProfitCost
              isLoading={isLoadingDaily}
              data={dailyRevenueProfitCostForWeeks || []}
            />
          }
          </Box>
      </Paper>
      <Box pt={2} className="grid grid-cols-2 gap-2">
        <TopSellingProducts data={topSellingProducts || []}/>
        <LowStockItems data={lowStockItems || []}/> 
      </Box>
      <Box py={2}>
      </Box>
    </Container>
  )
}
export default DashboardPage