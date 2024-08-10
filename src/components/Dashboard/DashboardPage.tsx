import { Box, Button, Container, Paper, Typography } from "@mui/material"
import RevenueProfitCost from "./RevenueProfitCost";
import { useGetDailyRevenueProfitCostForWeeksQuery, useGetInventoryTotalQuery, useGetLowStockItemsQuery, useGetRevenueProfitCostQuery, useGetTopSellingProductsQuery } from "../../app/redux/Slice/dashboardApi";
import { AttachMoney, Inventory, MoneyOff, TrendingUp } from "@mui/icons-material";
import DashboardList from "./DashboardList";
import TopSellingProducts from "./TopSellingProducts";
import LowStockItems from "./LowStockItems";
import WeeklyRevenueProfitCost from "./DailyRevenueProfitCostForWeeks";
import { useEffect, useState } from "react";

export interface DashboardCardProps {
  title: string;
  value: number | string;
  icon?:JSX.Element;
}
const DashboardPage = () => {

  const {data: revenueProfitCost, refetch:refetchMonthly} = useGetRevenueProfitCostQuery();
  const {data: DailyRevenueProfitCostForWeeks, refetch:refetchDaily} = useGetDailyRevenueProfitCostForWeeksQuery({});
  const {data: lowStockItems, refetch: refetchLowStock} = useGetLowStockItemsQuery({});
  const {data: topSellingProducts, refetch:refetchTopSelling} = useGetTopSellingProductsQuery({});
  const {data: inventoryTotalvalue, refetch:refetchInventoryTotalValue} = useGetInventoryTotalQuery();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  }

  const inventoryValue = inventoryTotalvalue?.toFixed(2) || 0;
  const revenue = revenueProfitCost?.[0]?.data[0]?.y.toFixed(2) || 0;
  const profit = (revenueProfitCost?.[2]?.data[0]?.y)?.toFixed(2) || 0;
  const cost = revenueProfitCost?.[1]?.data[0]?.y.toFixed(2) || 0;
  
  const contents: DashboardCardProps[] = [
    {title:'Revenue', value: revenue, icon: <AttachMoney color={"action"} />},
    {title:'Profit', value: profit , icon: <TrendingUp color={'success'}/>},
    {title:'Cost', value: cost, icon: <MoneyOff color={"error"} />},
    {title:'Inventory Total Value ', value: inventoryValue, icon: <Inventory/>},
    
  ];

  useEffect(() => {
    refetchMonthly();
    refetchDaily();
    refetchLowStock();
    refetchTopSelling();
    refetchInventoryTotalValue();
  }, [refetchMonthly, refetchDaily, refetchLowStock, refetchTopSelling, refetchInventoryTotalValue]);

  return (
    <Container>
      <Box pt={2}>
          <Typography variant='h3' gutterBottom>Dashboard</Typography>
      </Box>
      <Box pt={2}>
        <DashboardList contents={contents}/>
      </Box>
      <Paper sx={{height:450,p:2,mt:1, bgcolor:'#fefefe'}}>
        <Box px={1} display={'flex'} justifyContent={'space-between'}> 
            <Typography variant='h4' align='left'>Revenue, Profit and Cost</Typography>
            <Button variant="contained" onClick={handleToggle}>{toggle ? 'Weekly' : 'Monthly'}</Button>
        </Box>
        <Box height={400}>

          {toggle ?
            <RevenueProfitCost 
            data={revenueProfitCost || []}
            /> 
            : 
            <WeeklyRevenueProfitCost
            data={DailyRevenueProfitCostForWeeks || []}
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