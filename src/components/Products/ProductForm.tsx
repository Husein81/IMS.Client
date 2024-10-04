/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useGetCategoriesQuery } from "../../app/redux/Slice/categoryApi";
import {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../app/redux/Slice/productApi";
import { useGetSuppliersQuery } from "../../app/redux/Slice/supplierApi";
import { Product } from "../../app/models/Product";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../fire";
import { token } from "../../Theme";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/redux/Slice/modalSlice";
import ImageInput from "../Other/ImageInput";
import ImageOutput from "../Other/ImageOutput";

interface Props {
  id?: string;
  refetch: () => any;
}
const ProductForm: React.FC<Props> = ({ id, refetch: refetchAll }) => {
  const dispatch = useDispatch();

  const colors = token();

  const [images, setImages] = useState<FileList | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    cost: 0.0,
    currency: "",
    price: 0.0,
    quantity: 0,
    imageUrls: [],
    categoryId: "",
    supplierId: "",
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const previousFormData = useRef<Product | null>(null);

  const currencies: string[] = ["USD", "EUR", "LBP"];

  const { data: product, refetch: refetchId } = useGetProductQuery(id!, {
    skip: !id,
  });

  const { data } = useGetCategoriesQuery({ page: 1, pageSize: 10000 });
  const { data: suppliersList } = useGetSuppliersQuery({
    page: 1,
    pageSize: 10000,
  });

  const categories = data?.items || [];
  const suppliers = suppliersList?.items || [];

  const supplier = suppliers.find((sup) => sup.id === formData.supplierId);
  const category = categories.find((cat) => cat.id === formData.categoryId);

  useEffect(() => {
    if (product) {
      setFormData(product);
      supplier &&
        setFormData({
          ...product,
          supplierId: supplier.id,
        });
      category &&
        setFormData({
          ...product,
          categoryId: category.id,
        });
    }
  }, [product, supplier, category]);

  useEffect(() => {
    previousFormData.current = formData;
  }, [formData]);
  const [createProduct, { isLoading: isLoadingCreate }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductMutation();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const storeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            resolve(downloadUrl)
          );
        }
      );
    });
  };

  const handleImageSubmit = () => {
    const newImage = images as FileList;
    if (
      newImage.length > 0 &&
      newImage.length + formData.imageUrls.length < 7
    ) {
      setLoadingUpload(true);
      const promises: Promise<string>[] = [];
      for (let i = 0; i < newImage.length; i++) {
        promises.push(storeImage(newImage.item(i) as File));
      }
      Promise.all(promises)
        .then((urls: any) =>
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          })
        )
        .then(() => setLoadingUpload(false))
        .catch(() => {
          setLoadingUpload(false);
          console.log("Image upload failed (2 mb max per image)");
        });
    } else {
      setLoadingUpload(false);
      console.log("You can only upload 6 images per listing");
    }
  };

  const handleRemoveImage = (url: string, index: number) => {
    const imageName = url.split("/")[7].split("?")[0];
    const storage = getStorage(app);
    const storageRef = ref(storage, imageName);
    deleteObject(storageRef).catch(() =>
      console.log("Unable to delete the image")
    );
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_: any, i: number) => i !== index),
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (id) {
        await updateProduct(formData).unwrap();
        refetchId();
      } else await createProduct(formData).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(closeModal());
      refetchAll();

      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }
  };

  const isFormData =
    formData.name === "" ||
    formData.cost < 1 ||
    formData.price < 1 ||
    formData.currency === "" ||
    formData.quantity < 1 ||
    formData.categoryId === "" ||
    formData.supplierId === "";

  return (
    <Container component={"form"} onSubmit={handleSubmit}>
      <FormControl component={"fieldset"} fullWidth>
        <FormLabel component={"legend"}>
          {id ? (
            <Typography variant="h3">Edit Product</Typography>
          ) : (
            <Typography variant="h3">Add New Product</Typography>
          )}
        </FormLabel>
        <FormGroup>
          <Box display={"flex"} gap={2}>
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
              inputProps={{ min: 0 }}
              value={formData.cost}
              onChange={handleChange}
            />
          </Box>
          <Box display={"flex"} gap={2}>
            <TextField
              type="number"
              required
              fullWidth
              margin="dense"
              name="price"
              label="Price"
              inputProps={{ min: 0 }}
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
              inputProps={{ min: 0 }}
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
          <ImageInput
            setImages={setImages}
            handleImageSubmit={handleImageSubmit}
            loadingUpload={loadingUpload}
          />
          <ImageOutput
            colors={colors}
            formData={formData}
            handleRemoveImage={handleRemoveImage}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Currency</InputLabel>
            <Select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              {currencies.map((currency: string, index: number) => (
                <MenuItem key={index} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display={"flex"} gap={2}>
            <Autocomplete
              fullWidth
              options={categories}
              getOptionLabel={(category) => category.name}
              value={categories.find((cat) => cat.id === formData.categoryId)}
              onChange={(_, newValue) => {
                setFormData({
                  ...formData,
                  categoryId: newValue ? newValue.id : "",
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Category" margin="dense" />
              )}
            />

            <Autocomplete
              fullWidth
              options={suppliers}
              getOptionLabel={(supplier) => supplier.name}
              value={suppliers.find((sup) => sup.id === formData.supplierId)}
              onChange={(_, newValue) => {
                setFormData({
                  ...formData,
                  supplierId: newValue ? newValue.id : "",
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Supplier" margin="dense" />
              )}
            />
          </Box>
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          disabled={isFormData || isLoadingCreate || isLoadingUpdate}
        >
          {isLoadingCreate || isLoadingUpdate ? "Submitting" : "Submit"}
        </Button>
      </FormControl>
    </Container>
  );
};

export default ProductForm;
