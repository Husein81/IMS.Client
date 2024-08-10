import { Box, Button, Container, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import InvoiceTable from "./InvoiceTable";
import { useGetOrdersQuery } from "../../app/redux/Slice/orderApi";
import { useState } from "react";
import { Pagination } from "../../app/models/Pagination/pagination";
import { token } from "../../Theme";
import { Assignment, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";

const InvoicePage = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [pageModel, setPageModel] = useState<Pagination>({
    page: 0,
    pageSize: 10,
    searchTerm: ''
  });

  const { data, isLoading, refetch } = useGetOrdersQuery({
    page: pageModel.page + 1,
    pageSize: pageModel.pageSize,
    searchTerm: pageModel.searchTerm || ''
  });

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageModel({ ...pageModel, searchTerm: e.target.value });
  };

  return (
    <Container>
      <Box py={2}  display={'flex'} alignItems={'center'}  justifyContent={'space-between'} gap={2}>
        <Typography variant="h3" gutterBottom>Invoice</Typography>
        <Box
          display={'flex'}
          borderRadius={'3px'}
          bgcolor={colors.white[500]}
          height={'50px'}
          width={'100%'}>
          <InputBase
            sx={{ mx: 2, flex: 1, bgcolor: colors.white[500], color: 'black' }}
            placeholder="Search"
            name="searchTerm"
            type="search"
            value={pageModel.searchTerm}
            onChange={handleSearchTermChange}
            />
          <IconButton sx={{ borderRadius: 1, p: 1 }}>
            <Search />
          </IconButton>
        </Box>
        <Box width={240}>
          <Link to='/completedInvoice'>
            <Button variant="contained"  sx={{height:'50px'}}>
                <Assignment/>
            </Button>
          </Link>
        </Box>
      </Box>
      <Box  width={'100%'}>
        <InvoiceTable
          orders={data!}
          pageModel={pageModel}
          setPageModel={setPageModel}
          isLoading={isLoading}
          refetch={refetch}
        />
      </Box>
    </Container>
  );
};

export default InvoicePage;
