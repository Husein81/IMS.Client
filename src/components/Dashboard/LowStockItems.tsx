import { Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Product } from "../../app/models/Product";
import { Warning } from "@mui/icons-material";

interface Props{
    data: Product[];
}
const LowStockItems:React.FC<Props> = ({data}) => {
   
   
  return (
    <Card sx={{bgcolor:'#fefefe'}}>
      <CardContent>
        <Typography variant='h4' sx={{display:'flex', justifyContent:'center', gap:1}}  textAlign='center' ><Warning/>Low Stock Items</Typography>
          <List sx={{height:400,overflowY:'auto', scrollbarWidth:'none'}}>
              {data?.map((product: Product, index: number) => (
                product?.quantity < 10 ?
                  <ListItem key={index} sx={{border:2, borderRadius:2, my:1}}>
                    <ListItemText sx={{color:'#242424'}} primary={product.name} secondary={`Quantity: ${product.quantity}`} />
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