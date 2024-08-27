/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Product } from "../../app/models/Product";

interface Props {
  product: Product;
}
const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card
      sx={{
        bgcolor: "#fcfcfc",
        px: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        component={"img"}
        loading="lazy"
        src={product.imageUrls[0]}
        className="h-20 w-20 rounded"
      />
      <CardContent>
        <Typography variant="h6">
          Name:
          <Typography
            component={"span"}
            variant="subtitle2"
            className="text-slate-600"
          >
            {product.name}
          </Typography>
        </Typography>
        <Typography variant="h6">
          Price:
          <Typography
            component={"span"}
            variant="subtitle2"
            className="text-slate-600"
          >
            ${product.price}
          </Typography>
        </Typography>
        <Typography variant="h6">
          Quantity:
          <Typography
            component={"span"}
            variant="subtitle2"
            className="text-slate-600"
          >
            {product.quantity}
          </Typography>
        </Typography>
        <Typography variant="h6">
          Status:{" "}
          <Typography
            component={"span"}
            variant="subtitle2"
            className={product.quantity > 0 ? "text-slate-600" : "text-red-800"}
          >
            {product.quantity > 0 ? "In Stock" : "Out Of Stock"}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
