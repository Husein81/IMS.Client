import { 
    Box, 
    Container, 
    Typography, 
    useTheme 
} from "@mui/material"
import { useCreateOrderMutation } from "../../app/redux/Slice/orderApi"
import { RootState } from "../../app/redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../app/redux/Slice/productApi";
import { token } from "../../Theme";
import OrderForm from "./OrderForm";
import { useGetCustomersQuery } from "../../app/redux/Slice/customerApi";
import { useState } from "react";
import { Customer } from "../../app/models/Customer";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../app/redux/Slice/OrderSlice";
import { openModal } from "../../app/redux/Slice/modalSlice";
import CustomerForm from "../Customer/CustomerForm";
import { Order } from "../../app/models/Order";
import CustomerInfo from "./CustomerInfo";
import OrderSummary from "./OrderSummary";

const OrderPage = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const order = useSelector((state: RootState) => state.order);
    const {orderItems, totalPrice, itemsPrice} = order;

    const [createOrder, {isLoading:isLoadingCreate}] = useCreateOrderMutation(); 

    const {data: customers , refetch} = useGetCustomersQuery({page:1, pageSize:1000});

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
    const {data} = useGetProductsQuery({page:1, pageSize:1000});
    const handleOpenCustomerModal = () => {
        dispatch(openModal(<CustomerForm refetch={refetch}/>));
    };

    const handleCheckout = async () => {
       
        try {
            const updatedOrderItems = orderItems.map(item => {
                if (item.product && item.product.quantity && item.qty > item.product.quantity) {
                    throw new Error('Quantity is not available');
                } else {
                    const updatedProduct = item.product ? {
                        ...item.product,
                        quantity: item.product.quantity - item.qty
                    } : undefined;
                    return {
                        ...item,
                        product: updatedProduct
                    };
                }
            });
        
            const newOrder: Order = {
                createdAt: new Date().toISOString(),
                orderStatus: 'Pending...',
                shippingAddress: '',
                payment:parseFloat(totalPrice as string),
                itemsPrice: parseFloat(itemsPrice as string),
                discount: orderItems.reduce((acc, item) => acc + item.discount, 0),
                totalAmount: parseFloat(totalPrice as string),
                customerId: selectedCustomer?.id || '',
                orderItems: updatedOrderItems 
            }
        
            await createOrder(newOrder).unwrap();
            dispatch(await clearCart());
        } catch (error) {
            console.error(error);
        }finally{
            navigate('/invoice');
        }
    }

  return (
    <Container>
        <CustomerInfo 
            colors={colors} 
            handleOpenCustomerModal={handleOpenCustomerModal}/>
        <Typography variant="h3" gutterBottom>
          Create Order
        </Typography>
        <Box>
            <OrderForm 
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
                colors={colors} 
                customers={customers?.items || []}
                products={data?.items || []}
            />
        </Box>
        <Box>
            <OrderSummary
                colors={colors}
                orderItems={orderItems}
                totalPrice={totalPrice as string}
                isLoadingCreate={isLoadingCreate}
                handleCheckout={handleCheckout}/>
        </Box>
    </Container>
  )
}
export default OrderPage