import { Box, Container, Pagination, useTheme } from "@mui/material";
import ProductTable from "./ProductTable";
import { token } from "../../Theme";
import { useState } from "react";
import ProductList from "./ProductList";
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "../../app/redux/Slice/productApi";
import { Pagination as PaginationModel } from "../../app/models/Pagination/pagination";
import { useDispatch } from "react-redux";
import ProductForm from "./ProductForm";
import { openModal } from "../../app/redux/Slice/modalSlice";
import { useGetCategoriesQuery } from "../../app/redux/Slice/categoryApi";
import { Category } from "../../app/models/Category";
import ProductHeader from "./ProductHeader";
import ProductsFilter from "./ProductsFilter";

const ProductsPage = () => {
  const [toggle, setToggle] = useState(true);
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const dispatch = useDispatch();

  const [pageModel, setPageModel] = useState<PaginationModel>({
    page: 0,
    pageSize: 9,
    searchTerm: "",
  });
  const [category, setCategory] = useState<Category | null>(null);

  const selectCategoryHabdler = (category: Category) => {
    setCategory(category);
  };
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageModel({ ...pageModel, searchTerm: e.target.value });
  };

  const { data, isLoading, refetch } = useGetProductsQuery({
    page: pageModel.page + 1,
    pageSize: pageModel.pageSize,
    searchTerm: pageModel.searchTerm || "",
  });

  const { data: productsByCategory } = useGetProductsByCategoryQuery({
    id: category?.id || "",
    page: pageModel.page + 1,
    pageSize: pageModel.pageSize,
  });

  const { data: categories } = useGetCategoriesQuery({
    page: 1,
    pageSize: 1000,
  });
  console.log(categories);

  const handleAddProduct = () => {
    dispatch(openModal(<ProductForm refetch={refetch} />));
  };

  return (
    <Container>
      <ProductHeader
        colors={colors}
        pageModel={pageModel}
        handleSearchTermChange={handleSearchTermChange}
        handleAddProduct={handleAddProduct}
        toggle={toggle}
        setToggle={setToggle}
      />
      {toggle ? (
        <Box display={"flex"} flexDirection={"column"}>
          <Box>
            <ProductsFilter
              categories={categories?.items || []}
              setCategory={setCategory}
              selectCategoryHandler={selectCategoryHabdler}
            />
          </Box>
          <Box height={"70vh"}>
            <ProductList
              products={
                category ? productsByCategory?.items || [] : data?.items || []
              }
              isLoading={isLoading}
              colors={colors}
            />
          </Box>
          <Box>
            <Pagination
              count={data?.pagination.totalPages || 0}
              page={pageModel.page + 1}
              showFirstButton
              showLastButton
              sx={{ display: "flex", justifyContent: "center" }}
              onChange={(_event, value: number) =>
                setPageModel({ ...pageModel, page: value - 1 })
              }
              variant="text"
              shape="rounded"
            />
          </Box>
        </Box>
      ) : (
        <ProductTable
          products={category ? productsByCategory! : data!}
          pageModel={pageModel}
          setPageModel={setPageModel}
          isLoading={isLoading}
          refetch={refetch}
          colors={colors}
        />
      )}
    </Container>
  );
};
export default ProductsPage;
