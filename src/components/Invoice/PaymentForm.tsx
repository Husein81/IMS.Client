/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  useGetOrderQuery,
  useUpdateOrderPaymentMutation,
} from "../../app/redux/Slice/orderApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/Slice/modalSlice";

interface Props {
  id: string;
  refetch: () => any;
}
const PaymentForm: React.FC<Props> = ({ id, refetch }) => {
  const dispatch = useDispatch();
  const { data, refetch: refetchId } = useGetOrderQuery(id);
  const [Payment, setPayment] = useState(0);
  const [updateOrderPayment, { isLoading }] = useUpdateOrderPaymentMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payment = (data?.payment || 0) - Payment;
      await updateOrderPayment({ id, payment }).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(closeModal());
      refetchId();
      refetch();
    }
  };

  return (
    <Container component={"form"} onSubmit={handleSubmit}>
      <FormControl component={"fieldset"} fullWidth>
        <FormLabel>
          <Typography variant="h5">Payment</Typography>
        </FormLabel>
        <FormGroup>
          <TextField
            label="Payment"
            name="payment"
            margin="dense"
            type="number"
            value={Payment}
            inputProps={{
              step: 0.01,
              min: 0,
              max: data?.payment ? data.payment + 1 : undefined,
            }}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </FormGroup>
      </FormControl>
    </Container>
  );
};
export default PaymentForm;
