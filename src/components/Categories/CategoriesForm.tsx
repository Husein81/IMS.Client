import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Category } from "../../app/models/Category";
import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../app/redux/Slice/categoryApi";
import { closeModal } from "../../app/redux/Slice/modalSlice";
import { useDispatch } from "react-redux";
import {
  handleImageSubmit,
  handleRemoveImage,
} from "../../app/utils/generateImage";
import ImageInput from "../Other/ImageInput";
import ImageOutput from "../Other/ImageOutput";
import { token } from "../../Theme";

interface Props {
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: () => any;
}

const CategoriesForm: React.FC<Props> = ({ id, refetch: refetchAll }) => {
  const dispatch = useDispatch();

  const colors = token();
  const [formData, setFormData] = useState<Category>({
    name: "",
    description: "",
    imageUrls: [],
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const { data: category, refetch } = useGetCategoryQuery(id!, { skip: !id });

  const [createCategory, { isLoading: isLoadingCreate }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isLoadingUpdate }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onSubmitImage = async (file: FileList) => {
    handleImageSubmit(file, formData, setUploadLoading, setFormData);
  };
  const onRemoveImage = (url: string, i: number) => {
    handleRemoveImage(url, i, formData, setFormData);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (id) {
        await updateCategory(formData).unwrap();
        refetch();
      } else await createCategory(formData).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(closeModal());
      refetchAll();
    }
  };

  return (
    <Container component={"form"} autoComplete="off" onSubmit={handleSubmit}>
      <FormControl component={"fieldset"} fullWidth>
        <FormLabel component={"legend"}>
          {id ? (
            <Typography variant="h3">Edit Product</Typography>
          ) : (
            <Typography variant="h3">Add New Product</Typography>
          )}
        </FormLabel>
        <FormGroup>
          <TextField
            required
            name="name"
            label="Name"
            value={formData.name}
            margin="dense"
            onChange={handleChange}
          />
          <TextField
            multiline
            rows={3}
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            margin="dense"
          />
          <ImageInput
            setImages={setImageFile}
            handleImageSubmit={() => onSubmitImage(imageFile!)}
            loadingUpload={uploadLoading}
          />
          <ImageOutput
            colors={colors}
            handleRemoveImage={onRemoveImage}
            formData={formData}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || isLoadingUpdate ? "Submitting" : "Submit"}
          </Button>
        </FormGroup>
      </FormControl>
    </Container>
  );
};
export default CategoriesForm;
