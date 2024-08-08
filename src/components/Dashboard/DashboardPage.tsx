import { Box, Button, Container, Paper, Typography } from "@mui/material"
import RevenueProfitCost from "./RevenueProfitCost";
import { useGetDailyRevenueProfitCostForWeeksQuery, useGetLowStockItemsQuery, useGetRevenueProfitCostQuery, useGetTopSellingProductsQuery } from "../../app/redux/Slice/dashboardApi";
import { Paid } from "@mui/icons-material";
import DashboardList from "./DashboardList";
import TopSellinProducts from "./TopSellinProducts";
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
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  }

  console.log(revenueProfitCost);
  const contents: DashboardCardProps[] = [
    {title:'Revenue', value:revenueProfitCost?.[0]?.data[0]?.y || 0, icon: <Paid/>},
    {title:'Profit', value: (revenueProfitCost?.[2]?.data[0]?.y)?.toFixed(2) ||  0, icon: <Paid/>},
    {title:'Cost', value: revenueProfitCost?.[1]?.data[0]?.y || 0, icon: <Paid/>},
  ];

  useEffect(() => {
    refetchMonthly();
    refetchDaily();
    refetchLowStock();
    refetchTopSelling();
  }, [refetchMonthly, refetchDaily, refetchLowStock, refetchTopSelling]);
  return (
    <Container>
      <Box pt={2}>
          <Typography variant='h3' gutterBottom>Dashboard</Typography>
      </Box>
      <Box>
        <DashboardList contents={contents}/>
      </Box>
      <Box pt={2} className="grid grid-cols-2 gap-2">
        <TopSellinProducts data={topSellingProducts || []}/>
        <LowStockItems data={lowStockItems || []}/> 
      </Box>
      <Box py={2}>
      <Paper sx={{height:450,p:2, bgcolor:'#fefefe'}}>
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
      </Box>
    </Container>
  )
}
export default DashboardPage