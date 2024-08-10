/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import React from "react";
import { Delete, Edit, Receipt } from "@mui/icons-material";
import { ColorSet } from "../../Theme";
import { useDeleteSupplierMutation } from "../../app/redux/Slice/supplierApi";
import { useDispatch } from "react-redux";
import Loader from "../OtherComponents/Loader";
import { Pagination } from "../../app/models/Pagination/pagination";
import { SupplierPagination } from "../../app/models/Pagination/SupplierPagination";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { openModal } from "../../app/redux/Slice/modalSlice";
import SupplierForm from "./SupplierForm";
import { useNavigate } from "react-router-dom";

interface Props{
    suppliers: SupplierPagination,
    colors:ColorSet,
    isLoading:boolean,
    pageModel: Pagination,
    setPageModel: React.Dispatch<React.SetStateAction<Pagination>>,
    refetch: () => any
}
const SupplierTable: React.FC<Props> = ({colors, suppliers, pageModel, setPageModel, isLoading, refetch}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deleteSupplier] = useDeleteSupplierMutation();

    const handlePaginationChange = (modal: Pagination) => {
      setPageModel(modal);
    };
    const handleDelete = async (id: string) => {
      try{
        dispatch(await deleteSupplier(id).unwrap());
      }catch(err){
        console.log(err);
      }
      refetch();
    }
    const handleEdit = (id: string) => {
      dispatch(openModal(<SupplierForm refetch={refetch} id={id}/>));
    }

    const handleInvoic = (id: string) => {
      navigate(`/SupplierInvoice/${id}`);
    }
    const columns: GridColDef[] = [
      {field:'name', headerName:'Name', width: 200},
      {field:'email', headerName:'Email', width: 200},
      {field:'address', headerName:'Address', width: 200},
      {field:'phone', headerName:'Phone', width: 200},
      {field:'invoice', headerName:'See Invoice', width: 200,
        renderCell: (params) => (
          <Box display={'flex'} alignItems={'center'}>
            <IconButton onClick={() => handleInvoic(params.row.id)}>
              <Receipt/>
            </IconButton>
          </Box>
        )
      },
      {field:'Action', headerName:'Action', width: 200
        ,renderCell: (params) => (
            <Box display={'flex'} alignItems={'center'}>
              <IconButton onClick={() => handleEdit(params.row.id)}>
                <Edit/>
              </IconButton>
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <Delete/>
              </IconButton>
            </Box>
        )
      }
    ]; 
    const DataGridStyle = {
      height: 580,
      '& .MuiDataGrid-scrollbar':{
        width:0
      },
      backgroundColor:colors.white[600],
      textAlign : 'center',
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
    }
    const initialState: GridInitialStateCommunity = { 
      pagination:{
        paginationModel:{
          page: pageModel.page + 1,
          pageSize: pageModel.pageSize,
        }
      }
    };


    if(isLoading) return <Loader color={colors.blue[500]}/>

  return (
    <Box>
      <DataGrid
        sx={DataGridStyle}
        rows={suppliers.items}
        columns={columns}
        paginationMode="server"
        initialState={initialState}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={{ pageSize: pageModel.pageSize, page: pageModel.page }}
        onPaginationModelChange={(model) => handlePaginationChange(model)}
        rowCount={suppliers.pagination.totalCount }  
        loading={isLoading}
      />
    </Box>
  )
}
export default SupplierTable