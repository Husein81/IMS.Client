import { Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Product } from "../../app/models/Product";

interface Props{
    data: Product[];
    }
const TopSellinProducts:React.FC<Props> = ({ data }) => {
   
  return (
    <Card sx={{bgcolor:'#fefefe'}}>
        <CardContent>

            <Typography variant='h4' align='center'>Top Selling Products</Typography>
            <List>
                {data?.map((product: Product, index: number) => (
                    <ListItem key={index}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`}/>
                    </ListItem>
                ))}
            </List>
        </CardContent>
    </Card>
  )
}
export default TopSellinProducts