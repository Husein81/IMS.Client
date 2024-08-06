import { Box } from "@mui/material"
import { OrderItem } from "../../app/models/OrderItem";
import OrderItemCard from "./OrderItemCard";

interface Props{
  orderItems:OrderItem[];
}
const OrderItemList:React.FC<Props> = ({orderItems}) => {

    const content = orderItems.map((item) => (
      <OrderItemCard item={item} key={item.id}/>
    ));

  return (
    <Box className='grid grid-cols-1 gap-4 py-1'>
      {content}
    </Box>
  )
}
export default OrderItemList