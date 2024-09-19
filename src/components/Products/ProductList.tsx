import { Box } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";
import Loader from "../Other/Loader";

interface Props {
  products: Product[] | undefined;
  isLoading: boolean;
}
const ProductList: React.FC<Props> = ({ products, isLoading }) => {
  const content = products?.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));

  if (isLoading) return <Loader />;
  return <Box className="grid grid-cols-3 gap-2 pt-2">{content}</Box>;
};
export default ProductList;
