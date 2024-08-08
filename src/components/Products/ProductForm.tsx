/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, FormControl, FormGroup, FormLabel, IconButton, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material"
import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../app/redux/Slice/categoryApi";
import { useCreateProductMutation, useGetProductQuery, useUpdateProductMutation } from "../../app/redux/Slice/productApi";
import { useGetSuppliersQuery } from "../../app/redux/Slice/supplierApi";
import { Product } from "../../app/models/Product";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../../fire";
import { Cancel, Upload } from "@mui/icons-material";
import { token } from "../../Theme";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/Slice/modalSlice";


interface Props{
  id?: string;
  refetch: () => any;
}
const ProductForm: React.FC<Props> = ({ id , refetch:refetchAll}) => {
 const dispatch = useDispatch();
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [images, setImages] = useState<FileList | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    cost: 0.0,
    currency:'',
    quantity:0,
    imageUrls: [],
    categoryId: '',
    supplierId: ''
  });
  const currencies: string[] = ['USD', 'EUR', 'LBP'];
  
  const { data: product, refetch: refetchId } = useGetProductQuery(id!, { skip: !id });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const { data  } = useGetCategoriesQuery({ page: 1, pageSize: 10000 });
  const { data: suppliersList} = useGetSuppliersQuery({ page: 1, pageSize: 10000 });

  const categories = data?.items || [];
  const suppliers = suppliersList?.items || [];
  const [createProduct, { isLoading: isLoadingCreate}] = useCreateProductMutation();
  const [updateProduct, {isLoading: isLoadingUpdate}] = useUpdateProductMutation();
  
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const storeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) =>{
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl));
        }
      )
    });
  };

  const handleImageSubmit = () => {
    const newImage = images as FileList;
    if(newImage.length > 0 && newImage.length + formData.imageUrls.length < 7){
      setLoadingUpload(true);
      const promises: Promise<string>[] = [];
      for(let i = 0; i < newImage.length; i++ ){
        promises.push(storeImage(newImage.item(i) as File))
      }
      Promise.all(promises)
        .then((urls: any) => 
          setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls)
        }))
        .then(() => setLoadingUpload(false))
        .catch(() => {
          setLoadingUpload(false);
          console.log("Image upload failed (2 mb max per image)");
        })
    } else {
      setLoadingUpload(false);
      console.log("You can only upload 6 images per listing");
    }
  };
  
  const handleRemoveImage = (url: string, index: number) => {
    const imageName = url.split('/')[7].split('?')[0];
    const storage = getStorage(app); 
    const storageRef = ref(storage, imageName);
    deleteObject(storageRef)
      .catch(() => 
        console.log('Unable to delete the image')
      );
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_: any, i:number) => i !== index) 
      })
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (id) {
        await updateProduct(formData).unwrap();
        refetchId();
      }else await createProduct(formData).unwrap();
    } catch (error) {
      console.error(error);
    }finally{
      dispatch(closeModal());
      refetchAll();
    }
  }

  return (
    <Container component={'form'}  onSubmit={handleSubmit}>
      <FormControl component={'fieldset'} fullWidth>
        <FormLabel component={'legend'}>
          {id ? 
            <Typography variant='h3'>Edit Product</Typography> :
            <Typography variant='h3'>Add New Product</Typography>
          }
        </FormLabel>
        <FormGroup>
          <Box display={'flex'} gap={2}>
            <TextField
              required
              fullWidth
              margin="dense"
              name="name"
              label="Product Name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              margin="dense"
              name="cost"
              label="Cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
            />
          </Box>
          <Box display={'flex'} gap={2}>
            <TextField
              type="number"
              required
              fullWidth
              margin="dense"
              name="price"
              label="Price"
              value={formData.price}
              onChange={handleChange}
              />
            <TextField
              required
              fullWidth
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              />
            </Box>
          <TextField
            required
            fullWidth
            multiline
            rows={3}
            margin="dense"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <Box display={'flex'} gap={2} sx={{py:1}}>
            <IconButton component="label" sx={{ display: 'inline-block', border:1, borderRadius:1, borderColor:'#aeaeae' }}>
              <input 
              type="file" 
              accept="image/*" 
              hidden 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImages(e.target.files)} multiple />
              <Upload  fontSize="large"/>
            </IconButton>
            <Button variant="contained" color="secondary" sx={{color:'white'}} onClick={handleImageSubmit}>
                {loadingUpload ? 'Uploading...' : 'Upload'}
            </Button>
          </Box>
          <Box sx={{display:'flex', gap:2}}>
            {formData.imageUrls.length > 0 && formData.imageUrls.map((url: string, i: number) => (
              <Box
              key={i}
              className="flex justify-between p-3 border rounded-md"
              width={150}
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <IconButton
                  sx={{'&:hover':{bgcolor:'transparent'},height:'fit-content', color:colors.black[500]}}
                  onClick={() => handleRemoveImage(url, i)} >
                  <Cancel/>
                </IconButton>
              </Box>
            ))}
          </Box>
          <FormControl fullWidth margin="dense">
          <InputLabel>Currency</InputLabel>
          <Select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            {currencies.map((currency: string, index:number) => (
              <MenuItem key={index} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box display={'flex'} gap={2}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{mt:1,mb:2}}>
              <InputLabel>Supplier</InputLabel>
              <Select
                name="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoadingCreate || isLoadingUpdate}
        >
         {isLoadingCreate || isLoadingUpdate ?  "Submitting" : "Submit"}
        </Button>
       
      </FormControl>
    </Container>
  );
}

export default ProductForm;
