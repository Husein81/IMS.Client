import { TrendingUp } from "@mui/icons-material";
import { Card, List, ListItem, Typography } from "@mui/material"
import { FC } from "react"
import Loader from "../OtherComponents/Loader";

type SalesTrending = {
    month:string;
    year: string;
    sales: number;
}
type Props ={
    data: SalesTrending[];
    isLoading:boolean;
}
const MonthlySalesTrending: FC<Props> = ({ data, isLoading }) => {
    if(isLoading) return <Loader/>
  return (
    <Card sx={{bgcolor:'#fefefe'}}>
         <Typography variant='h4' sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:2}} ><TrendingUp/> Monthly Sales Trending</Typography>
            <List>
                {data?.map((sales, index: number) => (
                    <ListItem key={index} color="primary">
                       Date: {sales.month}/{sales.year}
                       <br/>
                       Sales: {sales.sales}
                    </ListItem>
                ))}
            </List>
    </Card>
  )
}
export default MonthlySalesTrending