import { Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Product } from "../../app/models/Product";
import { TrendingUp } from "@mui/icons-material";

interface Props{
    data: Product[];
    }
const TopSellingProducts:React.FC<Props> = ({ data }) => {
   
  return (
    <Card sx={{bgcolor:'#fefefe'}}>
        <CardContent >
            <Typography variant='h4' sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:2}} ><TrendingUp/> Top Selling Products</Typography>
            <List>
                {data?.map((product: Product, index: number) => (
                    <ListItem key={index} sx={{border:2, borderRadius:2, my:1}}>
                        <ListItemText  sx={{color:'#242424'}} primary={product.name} secondary={`Quantity Sold: ${product.quantity}`}/>
                    </ListItem>
                ))}
            </List>
        </CardContent>
    </Card>
  )
}
export default TopSellingProducts