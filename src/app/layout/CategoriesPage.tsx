import { Container } from "@mui/material";
import CategoriesTable from "./../../components/Categories/CategoriesTable";
import { openModal } from "../../app/redux/Slice/modalSlice";
import { useDispatch } from "react-redux";
import CategoriesForm from "./../../components/Categories/CategoriesForm";
import { token } from "../../Theme";
import { useGetCategoriesQuery } from "../../app/redux/Slice/categoryApi";
import Header from "./../../components/Other/Header";
import { useState } from "react";

const CategoriesPage = () => {
  const colors = token();

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    refetch,
    data: categories,
    isLoading,
  } = useGetCategoriesQuery({
    page: 1,
    pageSize: 1000,
  });

  const searchTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleAddCategory = async () => {
    dispatch(openModal(<CategoriesForm refetch={refetch} />));
  };
  return (
    <Container>
      <Header
        title={"Categories"}
        colors={colors}
        onAddHandler={handleAddCategory}
        pageModel={{ page: 1, pageSize: 1000, searchTerm }}
        searchTermHandler={searchTermHandler}
      />
      <CategoriesTable
        refetch={refetch}
        colors={colors}
        categories={categories!}
        isLoading={isLoading}
      />
    </Container>
  );
};
export default CategoriesPage;
