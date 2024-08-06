import { Box } from "@mui/material"
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";
import Loader from "../OtherComponents/Loader";
import { ColorSet } from "../../Theme";


interface Props {
  products: Product[] | undefined;
  isLoading: boolean;
  colors:ColorSet;
}
const ProductList:React.FC<Props> = ({products, isLoading, colors}) => {

    const content = products?.map((product) => (
      <ProductCard product={product} key={product.id}/>
    ));

    if(isLoading) return <Loader color={colors.blue[500]}/>
  return (
    <Box className="grid grid-cols-3 gap-2">
      {content}
    </Box>
  )
}
export default ProductList