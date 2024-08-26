import { Container, useTheme } from "@mui/material"
import CategoriesTable from "./CategoriesTable"
import { openModal } from "../../app/redux/Slice/modalSlice";
import { useDispatch } from "react-redux";
import CategoriesForm from "./CategoriesForm";
import { token } from "../../Theme";
import { useGetCategoriesQuery } from "../../app/redux/Slice/categoryApi";
import Header from "../Other/Header";

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
        <Header
          title={'Categories'}
          colors={colors}
          onAddHandler={handleAddCategory} 
          pageModel={{page:1, pageSize:1000, searchTerm:''}} 
          searchTermHandler={() =>{}}
        />
        <CategoriesTable refetch={refetch} colors={colors} categories={categories!} isLoading={isLoading}/>
    </Container>
  )
}
export default CategoriesPage