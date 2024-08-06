/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  Box, 
  Card, 
  CardContent, 
  Typography } from "@mui/material"
import { Product } from "../../app/models/Product";
import { useDispatch,  } from "react-redux";
import { addToCart } from "../../app/redux/Slice/OrderSlice";
import { useState } from "react";



interface Props {
  product: Product;
}
const ProductCard:React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const [qty] = useState(1);
  
  const addToCartHandler = async () =>{
    dispatch(addToCart({
      id: product.id ?? '',
      name: product.name,
      price: product.price ?? 0,
      qty,
      productId: product.id ?? '',
      product: product ?? null,
      discount: 0
    }));
  }

  return (
    <Card sx={{bgcolor:"#fcfcfc" ,px:1, cursor:'pointer', display:'flex', justifyContent:'space-between' ,alignItems:'center'}} onClick={addToCartHandler}>
    <Box component={'img'} src={product.imageUrls[0]} className="h-20 w-20 rounded"/>
    <CardContent>
      <Typography variant="h6">Name: {product.name}</Typography>
      <Typography variant="h6">Price: ${product.price}</Typography>
      <Typography variant="h6">Quantity: {product.quantity}</Typography>
      <Typography variant="subtitle1" >
        Status:{" "}
        <Box component={'span'} color={product.quantity > 0? '' : 'red'}>
          {product.quantity >0 ? "In Stock" : "Out Of Stock"}
        </Box>
      </Typography>
    </CardContent>
  </Card>
  )
}
export default ProductCard