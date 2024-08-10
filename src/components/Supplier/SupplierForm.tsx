/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, FormControl, FormGroup, FormLabel, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/Slice/modalSlice";
import { useCreateSupplierMutation, useGetSupplierQuery, useUpdateSupplierMutation } from "../../app/redux/Slice/supplierApi";
import { Supplier } from "../../app/models/Supplier";

interface Props{
    id?: string;
    refetch: () => any;
}
const SupplierForm: React.FC<Props> = ({ id, refetch }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<Supplier>({
        name: '',
        email: '',
        phone:'',
        address: '',
    });

    const [createSupplier,{isLoading: isLoadingCreate}] = useCreateSupplierMutation();
    const [updateSupplier,{isLoading: isLoadingUpdate}] = useUpdateSupplierMutation();

    const {data: Supplier, refetch:refetchById} = useGetSupplierQuery(id!, {skip: !id});


    useEffect(() => {
        if(Supplier){
            setFormData(Supplier);
        }
    },[Supplier]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            if(id){
                await updateSupplier(formData).unwrap();
                refetchById();
            }else await createSupplier(formData).unwrap();
        }catch(error){
            console.error(error);
        }finally{
            dispatch(closeModal());
            refetch();
        }
    }
    const isFormData = formData.name.trim() === '' ||
        formData.email.trim() === '' ||
        formData.phone.trim() === '' ||
        formData.address.trim() === '';
  return (
    <Container component='form' autoComplete="off" onSubmit={handleSubmit}>
        <FormControl component={'fieldset'} fullWidth>
            <FormLabel component={'legend'}>
                <Typography variant="h3" >    
                    Supplier Information
                </Typography>
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
                    onChange={handleChange}/>
                <TextField
                    type='tel'
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
                    disabled={isFormData|| isLoadingCreate || isLoadingUpdate}>
                    {isLoadingCreate || isLoadingUpdate ? 'Submitting...' : 'Submit'}
                </Button>
            </FormGroup>
        </FormControl>
    </Container>
  )
}
export default SupplierForm