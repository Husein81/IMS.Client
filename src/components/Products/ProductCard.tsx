/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/Product";
import { useDeleteProductMutation } from "../../app/redux/Slice/productApi";
import { openModal } from "../../app/redux/Slice/modalSlice";
import ProductForm from "./ProductForm";
import { useDispatch } from "react-redux";
import DeletingForm from "../Other/DeletingForm";

interface Props {
  product: Product;
  refetch: () => any;
}
const ProductCard: React.FC<Props> = ({ product, refetch }) => {
  const dispatch = useDispatch();
  const [deleteProduct, { isLoading: isLoadingDelete }] =
    useDeleteProductMutation();

  const handleEdit = (id: string) => {
    dispatch(openModal(<ProductForm refetch={refetch} id={id} />));
  };

  const deleteHandler = async (id: string) => {
    dispatch(
      openModal(
        <DeletingForm deleteItem={() => deleteProduct(id)} refetch={refetch} />
      )
    );
  };
  return (
    <Card
      sx={{
        bgcolor: "#fcfcfc",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box
          component={"img"}
          loading="lazy"
          src={product.imageUrls[0]}
          className="h-20 w-20 rounded"
        />
        <CardContent>
          <Typography variant="h6">Name: {product.name}</Typography>
          <Typography variant="h6">Price: ${product.price}</Typography>
          <Typography variant="h6">Quantity: {product.quantity}</Typography>
          <Typography variant="h6">
            Status:{" "}
            <Typography
              component={"span"}
              variant="body1"
              className={
                product.quantity > 0 ? "text-green-600" : "text-red-800"
              }
            >
              {product.quantity > 0 ? "In Stock" : "Out Of Stock"}
            </Typography>
          </Typography>
        </CardContent>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1 }}
      >
        <Button variant="contained" onClick={() => handleEdit(product.id)}>
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => deleteHandler(product.id)}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
};
export default ProductCard;
