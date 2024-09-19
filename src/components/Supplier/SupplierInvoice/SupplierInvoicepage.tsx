import { useParams } from "react-router-dom";
import { useGetSupplierProductsQuery } from "../../../app/redux/Slice/supplierApi";
import { useState } from "react";
import { Pagination } from "../../../app/models/Pagination/pagination";

import { token } from "../../../Theme";
import { Box, Container, Typography } from "@mui/material";

import SupplierInvoiceTable from "./SupplierInvoiceTable";

const SupplierInvoicePage = () => {
  const { id } = useParams<{ id: string }>();

  const colors = token();
  const [pageModel, setPageModel] = useState<Pagination>({
    page: 0,
    pageSize: 10,
  });
  const handlePaginationChange = (model: Pagination) => {
    setPageModel(model);
  };
  const { data, isLoading } = useGetSupplierProductsQuery({
    id: id || "",
    page: pageModel.page + 1,
    pageSize: pageModel.pageSize,
  });

  const supplierProducts = data || {
    items: [],
    pagination: { currentPage: 0, totalPages: 0, pageSize: 0, totalCount: 0 },
  };

  const totalAmount = supplierProducts.items.reduce(
    (acc, item) => acc + (item.cost || 1) * item.quantity,
    0
  );
  const supplierName =
    supplierProducts.items[0]?.supplier?.name || "Supplier Name";
  return (
    <Container>
      <Box display={"flex"} pt={2} justifyContent={"space-between"}>
        <Box p={1} className="border-2 rounded border-slate-300 bg-slate-200">
          <Typography variant="h3" color={"secondary"}>
            Supplier Name: {supplierName}
          </Typography>
        </Box>
        <Box p={1} className="border-2 rounded border-slate-300 bg-slate-200">
          <Typography variant="h3" color="secondary">
            Total Ammount: $ {totalAmount}
          </Typography>
        </Box>
      </Box>
      <Box pt={2}>
        <SupplierInvoiceTable
          colors={colors}
          data={supplierProducts}
          isLoading={isLoading}
          pageModel={pageModel}
          handlePaginationChange={handlePaginationChange}
        />
      </Box>
    </Container>
  );
};
export default SupplierInvoicePage;
