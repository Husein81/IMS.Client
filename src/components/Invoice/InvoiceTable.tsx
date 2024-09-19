/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { token } from "../../Theme";
import { Pagination } from "../../app/models/Pagination/pagination";
import React from "react";
import {
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../app/redux/Slice/orderApi";
import Loader from "../Other/Loader";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import {
  CheckCircle,
  CreditCardOff,
  Delete,
  Edit,
  PictureAsPdf,
} from "@mui/icons-material";
import { Order } from "../../app/models/Order";
import { useNavigate } from "react-router-dom";
import { OrderPagination } from "../../app/models/Pagination/OrderPagination";
import { openModal } from "../../app/redux/Slice/modalSlice";
import PaymentForm from "./PaymentForm";
import { useDispatch } from "react-redux";
import DeletingForm from "../Other/DeletingForm";

interface Props {
  orders: OrderPagination;
  pageModel: Pagination;
  isLoading: boolean;
  setPageModel: React.Dispatch<React.SetStateAction<Pagination>>;
  refetch: () => any;
}
const InvoiceTable: React.FC<Props> = ({
  orders: data,
  isLoading,
  pageModel,
  setPageModel,
  refetch,
}) => {
  const colors = token();
  const dispatch = useDispatch();

  const [deleteOrder, { isLoading: isLoadingDelete }] =
    useDeleteOrderMutation();

  const handlePaginationChange = (modal: Pagination) => {
    setPageModel(modal);
  };
  const deleteHandler = async (id: string) => {
    dispatch(
      openModal(
        <DeletingForm deleteItem={() => deleteOrder(id)} refetch={refetch} />
      )
    );
  };

  const orders = data?.items.map((order: Order) => {
    return {
      ...order,
      orderDate: new Date(order?.createdAt || "")
        .toLocaleDateString("en-GB")
        .split("T")[0],
      orderUpdatedAt: new Date(order?.updatedAt || "")
        .toLocaleDateString("en-GB")
        .split("T")[0],
    };
  });

  const navigate = useNavigate();
  const handleInvoicePDF = (id: string) => {
    navigate(`/invoice/${id}`);
  };

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleOrderStatus = async (id: string, orderStatus: string) => {
    try {
      await updateOrderStatus({ id, orderStatus }).unwrap();
    } catch (err) {
      console.error(err);
    }

    refetch();
  };

  const handlePayment = (id: string) => {
    dispatch(openModal(<PaymentForm id={id} refetch={refetch} />));
  };
  const columns: GridColDef[] = [
    { field: "customer", headerName: "Customer", width: 100 },
    { field: "orderDate", headerName: "Date", width: 150 },
    { field: "orderUpdatedAt", headerName: "UpdatedAt", width: 150 },
    {
      field: "orderStatus",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Box
          display="flex"
          gap={2}
          alignItems={"center"}
          className={
            params.row.orderStatus === "completed"
              ? "text-green-700"
              : params.row.orderStatus === "unpaid"
              ? "text-red-800"
              : "grey"
          }
        >
          {params.row.orderStatus}
        </Box>
      ),
    },
    {
      field: "payment",
      headerName: "Payment Left",
      width: 100,
      renderCell: (params) => (
        <Box display="flex" gap={2}>
          {params.row.payment}
          <IconButton
            disabled={params.row.payment === 0}
            onClick={() => handlePayment(params.row.id)}
          >
            <Edit />
          </IconButton>
        </Box>
      ),
    },
    { field: "totalAmount", headerName: "Total", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Box>
          {/* <IconButton 
            color="primary" 
            // onClick={() => handleEdit(params.row.id)}
          >
            <Edit />
          </IconButton> */}
          <IconButton
            color="primary"
            onClick={() => deleteHandler(params.row.id)}
            disabled={isLoadingDelete}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "invoice",
      headerName: "Invoice",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleInvoicePDF(params.row.id)}
        >
          <PictureAsPdf />
        </IconButton>
      ),
    },
    {
      field: "status",
      headerName: "Status Action",
      align: "center",
      width: 200,
      renderCell: (params) => (
        <Box gap={2} display="flex" py={1}>
          <IconButton
            color="primary"
            onClick={() => handleOrderStatus(params.row.id, "completed")}
            disabled={
              params.row.orderStatus === "completed" ||
              (params.row.orderStatus === "completed" &&
                params.row.payment === 0)
            }
          >
            <CheckCircle />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleOrderStatus(params.row.id, "unpaid")}
            disabled={
              params.row.orderStatus === "unpaid" ||
              (params.row.orderStatus === "completed" &&
                params.row.payment === 0)
            }
          >
            <CreditCardOff />
          </IconButton>
        </Box>
      ),
    },
  ];

  const DataGridStyle = {
    backgroundColor: colors.white[600],
    height: 580,
    "& .MuiDataGrid-scrollbar": {
      width: 0,
    },
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

  const rows = orders?.map((order, index) => {
    return {
      ...order,
      orderId: index + 1,
      customer: order.customer?.name,
    };
  });

  const initialState: GridInitialStateCommunity = {
    pagination: {
      paginationModel: {
        page: pageModel.page + 1,
        pageSize: pageModel.pageSize,
      },
    },
  };

  if (isLoading) return <Loader color={colors.blue[500]} />;
  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        sx={DataGridStyle}
        paginationMode="server"
        initialState={initialState}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={{ pageSize: pageModel.pageSize, page: pageModel.page }}
        onPaginationModelChange={handlePaginationChange}
        rowCount={data?.pagination.totalCount || 0}
        loading={isLoading}
      />
    </Box>
  );
};
export default InvoiceTable;
