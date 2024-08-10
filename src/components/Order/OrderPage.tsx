import { Box, Button, Container, IconButton, Paper, Typography, useTheme } from "@mui/material"
import { useCreateOrderMutation } from "../../app/redux/Slice/orderApi"
import { RootState } from "../../app/redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../app/redux/Slice/productApi";
import { token } from "../../Theme";
import OrderForm from "./OrderForm";
import OrderItemList from "./OrderItemList";
import { useGetCustomersQuery } from "../../app/redux/Slice/customerApi";
import { useState } from "react";
import { Customer } from "../../app/models/Customer";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../app/redux/Slice/OrderSlice";
import { PersonAddAlt1 } from "@mui/icons-material";
import { openModal } from "../../app/redux/Slice/modalSlice";
import CustomerForm from "../Customer/CustomerForm";
import { Order } from "../../app/models/Order";

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
            dispatch(clearCart());
        } catch (error) {
            console.error(error);
        }finally{
            navigate('/invoice');
        }
    }

  return (
    <Container>
        <Box display={'flex'} gap={2} alignItems={'center'}> 
            <IconButton
                onClick={handleOpenCustomerModal}
                color={'secondary'}
                >
                <PersonAddAlt1/>
            </IconButton>
            <Box sx={{cursor:'pointer', color:colors.black[500]}} onClick={() => navigate('/customers')}>
                View Customers
            </Box>
        </Box>
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
        <Box  py={2}>
            <Typography variant="h4" gutterBottom>
                Order Summary
            </Typography>
            
            <Paper elevation={3} sx={{bgcolor:colors.white[500], p:2}}>
                {  orderItems && orderItems.length > 0  ?
                    <OrderItemList 
                        orderItems={orderItems}
                    />
                    :
                    <Box  textAlign={'center'}>
                        <Typography variant="h5">No Order Items</Typography>
                    </Box> 
                }
                <Box display={'flex'} justifyContent={'space-between'} py={1}>
                    <Typography variant="h6">Total Price</Typography>
                    <Box>
                        <Typography variant="h6">$ {totalPrice}</Typography>
                    </Box>
                </Box>
                <Button 
                    variant="contained" 
                    fullWidth
                    onClick={handleCheckout}
                    disabled={isLoadingCreate}
                >{isLoadingCreate ? 'Submitting...' : 'Submit'}</Button>
            </Paper>
        </Box>
    </Container>
  )
}
export default OrderPage