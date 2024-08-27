/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ColorSet } from "../../Theme";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteCustomerMutation } from "../../app/redux/Slice/customerApi";
import { useDispatch } from "react-redux";
import { Pagination } from "../../app/models/Pagination/pagination";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { CustomerPagination } from "../../app/models/Pagination/CustomerPagination";
import DeletingForm from "../Other/DeletingForm";
import { openModal } from "../../app/redux/Slice/modalSlice";
import CustomerForm from "./CustomerForm";

type Props = {
  colors: ColorSet;
  customers: CustomerPagination;
  pageModel: Pagination;
  setPageModel: React.Dispatch<React.SetStateAction<Pagination>>;
  refetch: () => any;
};
const CustomerTable: React.FC<Props> = ({
  colors,
  pageModel,
  setPageModel,
  customers,
  refetch,
}) => {
  const dispatch = useDispatch();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const handlePaginationChange = (modal: {
    pageSize: number;
    page: number;
  }) => {
    setPageModel(modal);
  };
  const editHandler = (id: string) => {
    dispatch(openModal(<CustomerForm refetch={refetch} id={id} />));
  };
  const deleteHandler = async (id: string) => {
    dispatch(
      openModal(
        <DeletingForm deleteItem={() => deleteCustomer(id)} refetch={refetch} />
      )
    );
  };
  const DataGridStyle = {
    height: 500,
    "& .MuiDataGrid-scrollbar": {
      width: 0,
    },
    backgroundColor: colors.white[600],
    textAlign: "center",
    "& .MuiSvgIcon-root": {
      color: colors.gray[500],
    },
    "& .MuiDataGrid-overlay": {
      backgroundColor: colors.white[500],
    },

    "& .MuiDataGrid-row": {
      color: "#242424",
      "&:nth-of-type(even)": {
        backgroundColor: colors.white[500],
      },
    },
  };
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "phone", headerName: "Phone", width: 200 },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <IconButton onClick={() => editHandler(params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteHandler(params.row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];
  const initialState: GridInitialStateCommunity = {
    pagination: {
      paginationModel: {
        page: pageModel.page + 1,
        pageSize: pageModel.pageSize,
      },
    },
  };

  return (
    <Box>
      <DataGrid
        sx={DataGridStyle}
        rows={customers.items}
        columns={columns}
        paginationMode="server"
        initialState={initialState}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={{ pageSize: pageModel.pageSize, page: pageModel.page }}
        onPaginationModelChange={(model) => handlePaginationChange(model)}
        rowCount={customers?.pagination.totalCount || 0}
      />
    </Box>
  );
};
export default CustomerTable;
