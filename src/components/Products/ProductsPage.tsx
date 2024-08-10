import { Box, Button, Container, IconButton, InputBase, Pagination, Typography, useTheme } from "@mui/material"
import ProductTable from "./ProductTable";
import { token } from "../../Theme";
import {useState } from "react";
import ProductList from "./ProductList";
import { useGetProductsQuery } from "../../app/redux/Slice/productApi";
import { Pagination as PaginationModel } from "../../app/models/Pagination/pagination";
import { Add, GridOn, Search, TableRows } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import ProductForm from "./ProductForm";
import { openModal } from "../../app/redux/Slice/modalSlice";

const ProductsPage = () => {
    const [toggle, setToggle] = useState(false);
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const dispatch = useDispatch();


    const [pageModel, setPageModel] = useState<PaginationModel>({
      page: 0,
      pageSize: 10,
      searchTerm:''
    });

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPageModel({...pageModel, searchTerm: e.target.value});
    }
 
    const {data, isLoading, refetch} = useGetProductsQuery({
      page:pageModel.page + 1, 
      pageSize:pageModel.pageSize,
      searchTerm:pageModel.searchTerm || ''
    });
   
   
    const handleAddProduct = () => {
      dispatch(openModal(<ProductForm refetch={refetch}/>));
    }
   
  return (
    <Container>
      <Box py={2} display={'flex'} gap={3}  alignItems={'center'} justifyContent={'space-between'} >
        <Typography variant='h3' >
          Products
        </Typography>
        <Box 
          display={'flex'}
          borderRadius={'3px'}
          bgcolor={colors.white[500]}
          height={'50px'}
          width={'100%'}>
            <InputBase
              sx={{ mx:2, flex:1,bgcolor:colors.white[500], color:'black'}}
              placeholder="Search"
              name="searchTerm"
              type="search"
              value={pageModel.searchTerm}
              onChange={handleSearchTermChange}
            />
            <IconButton sx={{borderRadius:1, p:1}}>
              <Search/>
            </IconButton>
        </Box>
        <Box display={'flex'} height={"45px"} gap={1}>
          <Button 
            variant='contained' 
            color="primary"
            sx={{color:colors.white[500]}} 
            onClick={handleAddProduct}>
              <Add/>
          </Button>
          <Button variant="contained" color="primary"
            onClick={() => setToggle(!toggle)}>
              {toggle ? <GridOn/> : <TableRows />  }
          
          </Button>
        </Box>
      </Box>

     {!toggle ?
     <Box display={'flex'} flexDirection={'column'}>
     <Box height={'70vh'}>
        <ProductList   
          products={data?.items || []} 
          isLoading={isLoading}
          colors={colors}
        /> 
      </Box>
      <br/>
      <br/>
      <Pagination
        count={data?.pagination.totalPages || 0}
        page={pageModel.page + 1}
        showFirstButton
        showLastButton
        sx={{ display: 'flex', justifyContent: 'center', }}
        onChange={(_event,value:number) => setPageModel({...pageModel, page: value - 1})}
        variant="text"
        shape="rounded"
      />
      </Box>
     : 
      <ProductTable 
        products={data!}
        pageModel={pageModel}
        setPageModel={setPageModel}
        isLoading={isLoading}
        refetch={refetch}
        colors={colors}
      />}
    </Container>
  )
}
export default ProductsPage;