import { Autocomplete, Box, Button, Container, FormControl, Grid, Paper, TextField, Typography } from "@mui/material"
import { ColorSet } from "../../Theme"
import { Product } from "../../app/models/Product";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/redux/Slice/OrderSlice";
import { Customer } from "../../app/models/Customer";
import { Add, Cancel } from "@mui/icons-material";

interface Props{
    colors: ColorSet;
    products: Product[];
    customers: Customer[];
    setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | undefined>>;
    selectedCustomer: Customer | undefined;
}
const OrderForm : React.FC<Props>= ({ colors, customers, selectedCustomer,setSelectedCustomer,products }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
 
    const [isSelectedCustomer, setIsSelectedCustomer] = useState(false);

    const handleSetCustomer = () => {
        if(selectedCustomer === undefined) return;
            setIsSelectedCustomer(true);
    }
    const handleSelectedProduct = (_event: React.SyntheticEvent, newValue: Product | null) => {
        setSelectedProduct(newValue || undefined);
    }
    const [qty, setQty] = useState(1);
    const [discount, setDiscount] = useState(0);
    const dispatch = useDispatch();

   

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(addToCart({
            id: selectedProduct?.id || '',
            name: selectedProduct?.name || '',
            price: selectedProduct?.price || 0,
            qty,
            discount,
            productId: selectedProduct?.id || '',
            product: selectedProduct,
          }));
    }
    const cancelHandler = () => {
        setIsSelectedCustomer(false);
        setSelectedCustomer(undefined)
    }
    
  return (
    <Paper sx={{bgcolor:colors.white[500], py:2}} elevation={3}>
        <Container component={'form'} onSubmit={handleSubmit}>
            <FormControl component={'fieldset'} fullWidth>
                {!isSelectedCustomer ? 
                    <Grid container spacing={2} sx={{alignItems:'center'}}>
                        <Grid item xs={6}>
                            <Autocomplete
                                options={customers}
                                value={selectedCustomer}
                                onChange={(_event, newValue) => setSelectedCustomer(newValue || undefined)} 
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) =>
                                    <TextField
                                        required
                                        {...params}
                                        margin="dense"
                                        label="Customer Name"
                                        fullWidth   
                                    />}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Box display={"flex"} gap={1}>
                                <Button variant="contained" sx={{py:'12px'}} fullWidth onClick={handleSetCustomer}>
                                    <Add/>
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    :
                    <Box display={'flex'} gap={1}  alignItems={'center'}>
                        <Typography variant="h4">
                            Customer Name: {selectedCustomer?.name}
                        </Typography>
                        <Box className='cursor-pointer text-red-500' onClick={cancelHandler}>
                            <Cancel />
                        </Box>
                    </Box>

                }
                <Autocomplete
                    options={products}
                    getOptionLabel={(option) => option.name}
                    value={selectedProduct}
                    onChange={handleSelectedProduct}
                    renderInput={(params) => 
                    <TextField 
                        required
                        margin="dense" 
                        {...params} 
                        label="Product" 
                        fullWidth 
                    />}
                />
                <TextField
                    required
                    margin="dense"
                    label="Quantity"
                    name="qty"
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    inputProps={{min:1, max:selectedProduct?.quantity}}
                />
                <TextField
                    required
                    margin="dense"
                    label="Discount"
                    name="discount"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    inputProps={{min:0, max:100}}/>
                <Button     
                    disabled={!selectedCustomer || !selectedProduct  || !qty}
                    variant="contained"
                    type="submit">
                    Add Item
                </Button>
            </FormControl>
        </Container>
    </Paper>
  )
}
export default OrderForm