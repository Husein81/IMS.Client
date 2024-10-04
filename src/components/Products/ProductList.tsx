/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";
import Loader from "../Other/Loader";

interface Props {
  products: Product[] | undefined;
  isLoading: boolean;
  refetch: () => any;
}
const ProductList: React.FC<Props> = ({ products, isLoading, refetch }) => {
  const content = products?.map((product) => (
    <ProductCard refetch={refetch} product={product} key={product.id} />
  ));

  if (isLoading) return <Loader />;
  return (
    <Box className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
      {content}
    </Box>
  );
};
export default ProductList;
