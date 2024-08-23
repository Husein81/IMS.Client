import { 
  Box,
  Button,
  Container, 
  Paper, 
  Typography 
} from "@mui/material"
import RevenueProfitCost from "./RevenueProfitCost";
import { 
  useGetDailyRevenueProfitCostForWeeksQuery, 
  useGetLowStockItemsQuery, 
  useGetRevenueProfitCostQuery, 
  useGetTopSellingProductsQuery 
} from "../../app/redux/Slice/dashboardApi";
import { 
  AttachMoney, 
  Inventory, 
  MoneyOff, 
  TrendingUp 
} from "@mui/icons-material";
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


  //Monthly Revenue, Profit and Cost
  const revenueMonthly = (revenueProfitCost?.[0].data[currentMonth]?.y)?.toFixed(2) ?? 0;
   const profitMonthly = (revenueProfitCost?.[2]?.data[currentMonth]?.y)?.toFixed(2) ?? 0;
  const costMonthly = (revenueProfitCost?.[1]?.data[currentMonth]?.y)?.toFixed(2) ?? 0;
  
  //Daily Revenue, Profit and Cost
  const revenueDaily = (dailyRevenueProfitCostForWeeks?.[0].data[currentDay]?.y)?.toFixed(2) ?? 0;
  const profitDaily = (dailyRevenueProfitCostForWeeks?.[2]?.data[currentDay]?.y)?.toFixed(2) ?? 0;
  const costDaily = (dailyRevenueProfitCostForWeeks?.[1]?.data[currentDay]?.y)?.toFixed(2) ?? 0;

  const revenue = toggle ? revenueMonthly : revenueDaily;
  const profit = toggle ? profitMonthly : profitDaily;
  const cost = toggle ? costMonthly : costDaily;

  const contents: DashboardCardProps[] = [
    
    {title:"Number of Sales", value: inventoryTotal?.items.length || 0, icon: <Inventory color="info"/>},
    {title:'Revenue', value: revenue, icon: <AttachMoney color={"primary"} />},
    {title:'Profit', value: profit , icon: <TrendingUp color={'success'}/>},
    {title:'Cost', value: cost, icon: <MoneyOff color={"error"} />},    
  ];

  useEffect(() => {
    refetchMonthly();
    refetchDaily();
    refetchLowStock();
    refetchTopSelling();
  }, [refetchMonthly, refetchDaily, refetchLowStock, refetchTopSelling]);
  
  if(isLoadingMonthly || isLoadingDaily) return <Loader  />;

  return (
    <Container>
      <NavBar title="Dashboard"/>
      <Box pt={2} display={'flex'} justifyContent={'flex-end'}>
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
              data={revenueProfitCost || [{id:"", data:[{x:'',y:0}]}]}
            /> 
            : 
            <WeeklyRevenueProfitCost
              isLoading={isLoadingDaily}
              data={dailyRevenueProfitCostForWeeks || [{id:"", data:[{x:'',y:0}]}]}
            />
          }
          </Box>
      </Paper>
      <Box py={2} className="grid grid-cols-2 gap-2">
        <TopSellingProducts data={topSellingProducts || []}/>
        <LowStockItems data={lowStockItems || []}/> 
      </Box>
    </Container>
  )
}
export default DashboardPage