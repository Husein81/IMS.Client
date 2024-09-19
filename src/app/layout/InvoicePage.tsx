import { Box, Container } from "@mui/material";
import InvoiceTable from "./../../components/Invoice/InvoiceTable";
import { useGetOrdersQuery } from "../../app/redux/Slice/orderApi";
import { useState } from "react";
import { Pagination } from "../../app/models/Pagination/pagination";
import { token } from "../../Theme";

import InvoiceHeader from "./../../components/Invoice/InvoiceHeader";

const InvoicePage = () => {
  const colors = token();
  const [pageModel, setPageModel] = useState<Pagination>({
    page: 0,
    pageSize: 10,
    searchTerm: "",
  });

  const { data, isLoading, refetch } = useGetOrdersQuery({
    page: pageModel.page + 1,
    pageSize: pageModel.pageSize,
    searchTerm: pageModel.searchTerm || "",
  });

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageModel({ ...pageModel, searchTerm: e.target.value });
  };

  return (
    <Container>
      <InvoiceHeader
        colors={colors}
        pageModel={pageModel}
        handleSearchTermChange={handleSearchTermChange}
      />
      <Box width={"100%"}>
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
