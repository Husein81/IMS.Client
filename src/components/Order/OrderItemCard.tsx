import { Box, IconButton, Typography } from "@mui/material";
import { OrderItem } from "../../app/models/OrderItem";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../app/redux/Slice/OrderSlice";

interface Props{
    item:OrderItem;
}
const OrderItemCard:React.FC<Props> = ({ item }) => {
    const dispatch = useDispatch(); 
    const handleRemove =async(item: OrderItem) => {
        dispatch(removeFromCart(item.productId));
    }
  return (
    <Box border={1} borderRadius={1}>
        <Box sx={{ p:1,display:'flex', justifyContent:'space-between'}}>
            <Box component={'img'} src={item.product?.imageUrls[0]} className="h-20 w-20 rounded"/>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={8}>
                <Box>
                    <Typography variant="h6">Name: {item.name}</Typography>
                    <Typography variant="h6">Quantity: {item.qty}</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">Description:</Typography>
                    <Typography variant="body2" px={1}>{item.product?.description}</Typography>
                </Box>
            </Box>
            <Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="body1">Price: ${item.price.toFixed(2)}</Typography>
                    <IconButton  onClick={() => handleRemove(item)}>
                        <Delete/>
                    </IconButton>
                </Box>
                <Typography variant="body1">Discount: ${item.discount}</Typography>
                <Typography variant="body1">Total: ${(item.qty* item.price - (item.qty*item.price*item.discount)/100).toFixed(2)}</Typography>
            </Box>
        </Box>
    </Box>
  )
}
export default OrderItemCard