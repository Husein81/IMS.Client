import { Container } from "@mui/material";
import { token } from "../../Theme";
import { useGetSuppliersQuery } from "../../app/redux/Slice/supplierApi";
import SupplierTable from "./SupplierTable";
import { Pagination } from "../../app/models/Pagination/pagination";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/redux/Slice/modalSlice";
import SupplierForm from "./SupplierForm";
import Header from "../Other/Header";

const SupplierPage = () => {
  const colors = token();
  const dispatch = useDispatch();

  const [pageModel, setPageModel] = useState<Pagination>({
    page: 0,
    pageSize: 10,
    searchTerm: "",
  });

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageModel({ ...pageModel, searchTerm: e.target.value });
  };

  const handleAddSupplier = () => {
    dispatch(openModal(<SupplierForm refetch={refetch} />));
  };
  const { data, isLoading, refetch } = useGetSuppliersQuery({
    page: pageModel.page + 1,
    pageSize: pageModel.pageSize,
  });
  return (
    <Container>
      <Header
        title={"Suppliers"}
        colors={colors}
        pageModel={pageModel}
        onAddHandler={handleAddSupplier}
        searchTermHandler={handleSearchTermChange}
      />
      <SupplierTable
        suppliers={data!}
        pageModel={pageModel}
        setPageModel={setPageModel}
        refetch={refetch}
        isLoading={isLoading}
        colors={colors}
      />
    </Container>
  );
};
export default SupplierPage;
