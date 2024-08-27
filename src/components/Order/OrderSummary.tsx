import { Box, Button, Paper, Typography } from "@mui/material";
import OrderItemList from "./OrderItemList";
import { ColorSet } from "../../Theme";
import { OrderItem } from "../../app/models/OrderItem";
import { FC } from "react";

type Props = {
  colors: ColorSet;
  orderItems: OrderItem[];
  totalPrice: string;
  isLoadingCreate: boolean;
  handleCheckout: () => void;
};
const OrderSummary: FC<Props> = ({
  colors,
  orderItems,
  totalPrice,
  isLoadingCreate,
  handleCheckout,
}) => {
  return (
    <Box py={2}>
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      <Paper elevation={3} sx={{ bgcolor: colors.white[500], p: 2 }}>
        {orderItems && orderItems.length > 0 ? (
          <OrderItemList orderItems={orderItems} />
        ) : (
          <Box textAlign={"center"}>
            <Typography variant="h5" color="error">
              No Ordered Items
            </Typography>
          </Box>
        )}
        <Box display={"flex"} justifyContent={"space-between"} py={1}>
          <Typography variant="h6">Total Price</Typography>
          <Box>
            <Typography variant="h6">
              $
              {!isNaN(parseFloat(totalPrice))
                ? parseFloat(totalPrice).toFixed(2)
                : "0.0"}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={handleCheckout}
          disabled={isLoadingCreate}
        >
          {isLoadingCreate ? "Submitting..." : "Submit"}
        </Button>
      </Paper>
    </Box>
  );
};
export default OrderSummary;
