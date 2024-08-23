import { Box, Button, Container, Typography, useTheme } from "@mui/material"
import CategoriesTable from "./CategoriesTable"
import { openModal } from "../../app/redux/Slice/modalSlice";
import { useDispatch } from "react-redux";
import CategoriesForm from "./CategoriesForm";
import { token } from "../../Theme";
import { useGetCategoriesQuery } from "../../app/redux/Slice/categoryApi";
import { Add } from "@mui/icons-material";

const CategoriesPage = () => {
  const theme = useTheme();  
  const colors = token(theme.palette.mode);

  const dispatch = useDispatch(); 

  const {refetch, data: categories, isLoading } = useGetCategoriesQuery({
    page:1, 
    pageSize: 1000
});
 
  const handleAddCategory = async () => {
    dispatch(openModal(<CategoriesForm refetch={refetch}/>));
  }
  return (
    <Container>
      <Box py={1}  display={'flex'} alignItems={'center'}  justifyContent={'space-between'}>
          <Typography variant='h3' gutterBottom>Categories</Typography>
          <Button 
            variant='contained' 
            color="primary"
            sx={{color:colors.white[500], height:'40px'}}  
            onClick={handleAddCategory}>
              <Add/>
            </Button>
      </Box>
        <CategoriesTable refetch={refetch} colors={colors} categories={categories!} isLoading={isLoading}/>
    </Container>
  )
}
export default CategoriesPage