/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, useTheme } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { token } from "../../Theme";
import { Pagination } from "../../app/models/Pagination/pagination";
import React from "react";
import { useDeleteOrderMutation } from "../../app/redux/Slice/orderApi";
import Loader from "../OtherComponents/Loader";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { Delete, PictureAsPdf } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Order } from "../../app/models/Order";
import { useNavigate } from "react-router-dom";
import { OrderPagination } from "../../app/models/Pagination/OrderPagination";


interface Props{
  orders: OrderPagination;
  pageModel: Pagination;
  isLoading: boolean;
  setPageModel: React.Dispatch<React.SetStateAction<Pagination>>;  
  refetch: () => any;
}
const InvoiceTable:React.FC<Props> = ({ orders: data,isLoading, pageModel, setPageModel, refetch}) => {
 
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const dispatch = useDispatch();
  const [deleteOrder, {isLoading: isLoadingDelete}] = useDeleteOrderMutation();

  const handlePaginationChange = (modal: Pagination) => {
    setPageModel(modal);
  };

  const handleDelete = async(id: string) => {
    try{
      dispatch(await deleteOrder(id).unwrap());
    }catch(error){
      console.error(error);
    }finally{
      refetch();
    }
  }

  const orders = data?.items.map((order:Order) => {
    return {
      ...order,
      orderDate: new Date(order?.createdAt || '').toISOString().split('T')[0] ,
    }
  });

  const navigate = useNavigate()
  const handleInvoicePDF = (id: string) => {
    navigate(`/invoice/${id}`);
  }
  
  const columns: GridColDef[] = [
    { field: 'customer', headerName: 'Customer', width: 100 },
    { field: 'orderDate', headerName: 'Date', width: 200 },
    { field: 'orderStatus', headerName: 'Status', width: 100},
    { field: 'totalAmount', headerName: 'Total', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Box >
          {/* <IconButton 
            color="primary" 
            // onClick={() => handleEdit(params.row.id)}
          >
            <Edit />
          </IconButton> */}
          <IconButton 
            color="primary" 
            onClick={() => handleDelete(params.row.id)}
            disabled={isLoadingDelete}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
    {
      field: 'invoice',
      headerName: 'Invoice',
      width: 100,
      renderCell: (params) => (
        <IconButton 
          color="primary" 
          onClick={() => handleInvoicePDF(params.row.id)}
        >
          <PictureAsPdf/>
        </IconButton>
      ),
    }
  ];

  const DataGridStyle = {
    backgroundColor:colors.white[600],
    height: 580,
    '& .MuiDataGrid-scrollbar':{
      width:0
    },
    '& .MuiSvgIcon-root':{
      color:colors.gray[500]
    },
    '& .MuiDataGrid-overlay':{
      backgroundColor:colors.white[500],
    },
    
    '& .MuiDataGrid-row':{
      color:'#242424',
     '&:nth-of-type(even)':{
      backgroundColor:colors.white[500] ,
     }
    }
  };

  const rows = orders?.map((order, index) => {
    return{
      ...order,
      orderId:index+1,
      customer: order.customer?.name,
    }
  });

  const initialState: GridInitialStateCommunity = { 
    pagination:{
      paginationModel:{
        page: pageModel.page + 1,
        pageSize: pageModel.pageSize,
      }
    }
  }

  if(isLoading) return <Loader color={colors.blue[500]}/>
  return (
    <Box >
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        sx={DataGridStyle}
        paginationMode="server"
        initialState={initialState}
        pageSizeOptions={[10, 25, 50, 100 ]}
        paginationModel={{ pageSize: pageModel.pageSize, page: pageModel.page }}
        onPaginationModelChange={handlePaginationChange}
        rowCount={data?.pagination.totalCount || 0}  
        loading={isLoading} 
      />
    </Box>
  )
}
export default InvoiceTable