import { Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Product } from "../../app/models/Product";

interface Props{
    data: Product[];
}
const LowStockItems:React.FC<Props> = ({data}) => {
   
   
  return (
    <Card sx={{bgcolor:'#fefefe'}}>
      <CardContent>
        <Typography variant='h4' align='center'>Low Stock Items</Typography>
          <List sx={{height:400,overflowY:'auto', scrollbarWidth:'none'}}>
              {data?.map((product: Product, index: number) => (
                product?.quantity < 10 ?
                  <ListItem key={index}>
                    <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                    <Typography variant='body2'>Price: ${product.price}</Typography>
                  </ListItem>
                  : null
              ))}
          </List>
        </CardContent>
    </Card>
  )
}
export default LowStockItems