import { Box, Button, Container, IconButton, InputBase, Typography, useTheme } from "@mui/material"
import { token } from "../../Theme";
import { useGetSuppliersQuery } from "../../app/redux/Slice/supplierApi";
import SupplierTable from "./SupplierTable";
import { Pagination } from "../../app/models/Pagination/pagination";
import { useState } from "react";
import { Add, Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/redux/Slice/modalSlice";
import SupplierForm from "./SupplierForm";

const SupplierPage = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const dispatch = useDispatch();

    const [pageModel, setPageModel] = useState<Pagination>({
      page:0,
      pageSize: 10,
      searchTerm:''
    });
    
    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPageModel({...pageModel, searchTerm: e.target.value});
    };

    const handleAddSupplier = () => { 
      dispatch(openModal(<SupplierForm refetch={refetch}/>));
    } 
    const {data, isLoading, refetch} = useGetSuppliersQuery({
      page: pageModel.page + 1,
      pageSize: pageModel.pageSize,
    });
  return (
    <Container>
        <Box py={1} display={'flex'} gap={3}  alignItems={'center'} justifyContent={'space-between'} >
        <Typography variant='h3' >
          Suppliers
        </Typography>
        <Box 
          display={'flex'}
          borderRadius={'3px'}
          bgcolor={colors.white[500]}
          height={'40px'}
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
        <Box display={'flex'} height={"40px"} gap={1}>
          <Button 
            variant='contained' 
            color="primary"
            sx={{color:colors.white[500]}} 
            onClick={handleAddSupplier}
            >
              <Add/>
          </Button>
        </Box>
        </Box>
        <SupplierTable 
            suppliers={data || {items:[], pagination:{totalCount:0, totalPages:0, currentPage:0, pageSize:0}}} 
            pageModel={pageModel}
            setPageModel={setPageModel}
            refetch={refetch} 
            isLoading={isLoading} 
            colors={colors} />
    </Container>
  )
}
export default SupplierPage