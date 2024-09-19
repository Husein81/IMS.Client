import { Box, Container } from "@mui/material";
import CompletedInvoiceTable from "./CompletedInvoiceTable";
import { useGetCompletedOrdesQuery } from "../../../app/redux/Slice/orderApi";
import { useEffect, useState } from "react";
import { Pagination } from "../../../app/models/Pagination/pagination";
import { token } from "../../../Theme";

import CompletedInvoiceHeader from "./CompletedInvoiceHeader";

const CompletedInvoicePage = () => {
  const colors = token();
  const [pageModel, setPageModel] = useState<Pagination>({
    page: 0,
    pageSize: 10,
    searchTerm: "",
  });

  const { data, isLoading, refetch } = useGetCompletedOrdesQuery({
    page: pageModel.page + 1,
    pageSize: pageModel.pageSize,
    searchTerm: pageModel.searchTerm || "",
  });

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageModel({ ...pageModel, searchTerm: e.target.value });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Container>
      <CompletedInvoiceHeader
        colors={colors}
        pageModel={pageModel}
        handleSearchTermChange={handleSearchTermChange}
      />
      <Box width={"100%"}>
        <CompletedInvoiceTable
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

export default CompletedInvoicePage;
