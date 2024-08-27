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
import { Customer } from "../../app/models/Customer";
import React, { useEffect, useState } from "react";
import {
  useCreateCustomerMutation,
  useGetCustomerQuery,
  useUpdateCustomerMutation,
} from "../../app/redux/Slice/customerApi";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/Slice/modalSlice";

interface Props {
  id?: string;
  refetch: () => any;
}
const CustomerForm: React.FC<Props> = ({ id, refetch }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [createCustomer, { isLoading: isLoadingCreate }] =
    useCreateCustomerMutation();
  const [updateCustomer, { isLoading: isLoadingUpdate }] =
    useUpdateCustomerMutation();

  const { data: customer, refetch: refetchById } = useGetCustomerQuery(id!, {
    skip: !id,
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCustomer(formData).unwrap();
        refetchById();
      } else await createCustomer(formData).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(closeModal());
      refetch();
    }
  };

  const isFormValid: boolean =
    formData.name === "" &&
    formData.email === "" &&
    formData.phone === "" &&
    formData.address === "";

  return (
    <Container component="form" autoComplete="off" onSubmit={handleSubmit}>
      <FormControl component={"fieldset"} fullWidth>
        <FormLabel component={"legend"}>
          <Typography variant="h3">Customer Information</Typography>
        </FormLabel>
        <FormGroup>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            margin="dense"
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            margin="dense"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Address"
            name="address"
            margin="dense"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            type="tel"
            label="Phone"
            name="phone"
            margin="dense"
            value={formData.phone}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={isFormValid || isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || isLoadingUpdate ? "Submitting..." : "Submit"}
          </Button>
        </FormGroup>
      </FormControl>
    </Container>
  );
};
export default CustomerForm;
