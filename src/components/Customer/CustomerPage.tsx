import { Search } from "@mui/icons-material"
import { Box, Container, IconButton, InputBase, Typography, useTheme } from "@mui/material"
import { token } from "../../Theme"
import CustomerTable from "./CustomerTable";
import { useGetCustomersQuery } from "../../app/redux/Slice/customerApi";
import { useState } from "react";
import { Pagination } from "../../app/models/Pagination/pagination";

const CustomerPage = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const [pageModel, setPageModel] = useState<Pagination>({
        page:0,
        pageSize: 10,
    });
    const {data, refetch} = useGetCustomersQuery({
        page: pageModel.page + 1,
        pageSize: pageModel.pageSize,
    });

  return (
    <Container>
        <Box py={2} display={'flex'} gap={3}  alignItems={'center'} justifyContent={'space-between'} >
            <Typography variant='h3' >
                Customers
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
                
                />
                <IconButton sx={{borderRadius:1, p:1}}>
                <Search/>
                </IconButton>
            </Box>
        </Box>
        <Box pt={2}> 
            <CustomerTable 
                refetch={refetch}
                pageModel={pageModel}
                setPageModel={setPageModel}
                customers={data || {items:[], pagination:{totalCount:0, totalPages:0, currentPage:0, pageSize:0}}}
                colors={colors}/>
        </Box>
    </Container>
  )
}
export default CustomerPage