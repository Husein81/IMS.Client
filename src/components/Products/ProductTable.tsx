/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { 
  useDeleteProductMutation,
} from "../../app/redux/Slice/productApi";
import Loader from "../Other/Loader";
import {Delete,Edit}from '@mui/icons-material';
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { ColorSet } from "../../Theme";
import React from "react";
import { Pagination } from "../../app/models/Pagination/pagination";
import { useDispatch } from "react-redux";
import { ProductPagination } from "../../app/models/Pagination/ProductPagination";
import ProductForm from "./ProductForm";
import { openModal } from "../../app/redux/Slice/modalSlice";
import DeletingForm from "../Other/DeletingForm";

interface Props{
  colors: ColorSet;
  isLoading: boolean;
  refetch: () => any;
  products: ProductPagination;
  pageModel: Pagination;
  setPageModel: React.Dispatch<React.SetStateAction<Pagination>>;
}

const ProductTable: React.FC<Props>= ({colors, products,pageModel, setPageModel, isLoading, refetch}) => {
    const dispatch = useDispatch();
    
    const handlePaginationChange = (modal: {pageSize:number, page:number}) => {
      setPageModel(modal);
    };
    
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
    
    const [deleteProduct, {isLoading: isLoadingDelete}] = useDeleteProductMutation();
    
    const handleEdit = (id: string) => {
      dispatch(openModal(<ProductForm refetch={refetch} id={id}/>));
    };
    
    const deleteHandler = async (id:string) => {
      dispatch(openModal(<DeletingForm 
        deleteItem={() => deleteProduct(id)}
        refetch={refetch} />));
    }
    
    const rows = products?.items.map((product ,index) => {
      return {
        productId: index +1,
        ...product,
        categoryName: product.category?.name,
        supplierId: product.supplier?.name,
      };
    })
    
  
    const columns: GridColDef[] = [
      { field: 'name', headerName: 'Name', width: 100 },
      { field: 'imageUrls', headerName: 'Image URL', width: 100, renderCell: (params) => (
        <Box component={'img'} loading="lazy" src={params.row.imageUrls[0]} alt="product image" width={50} height={50} />
      ),},
      { field: 'description', headerName: 'Description', width: 100},
      { field: 'quantity', headerName: 'Quantity', width: 100 },
      { field: 'cost', headerName: 'Cost', width: 100 },
      { field: 'price', headerName: 'Price', width: 100 },
      { field: 'status', headerName:'Status', width:100, 
        renderCell:(params) => (
          <Box className={params.row.quantity > 0 ? '' : 'text-red-800'}>
            {params.row.quantity > 0 ? 'In Stock' : 'Out Of Stock'}
          </Box>
        )
      },
      { field: 'currency', headerName: 'Currency', width: 100 },
      { field: 'categoryName',headerName:'Category',width: 100 },
      { field: 'supplierId', headerName: 'Supplier', width: 100 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              color="primary" 
              onClick={() => handleEdit(params.row.id)}
            >
              <Edit />
            </IconButton>
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
    ];
    const initialState: GridInitialStateCommunity = { 
      pagination:{
        paginationModel:{
          page: pageModel.page + 1,
          pageSize: pageModel.pageSize,
        }
      }
    };

    if (isLoading) return <Loader />;

  return (
      <Box py={1}>
        <DataGrid
          sx={DataGridStyle}
          rows={rows}
          columns={columns}
          paginationMode="server"
          initialState={initialState}
          pageSizeOptions={[9, 25, 50, 100]}
          paginationModel={{ pageSize: pageModel.pageSize, page: pageModel.page }}
          onPaginationModelChange={(model) => handlePaginationChange(model)}
          rowCount={products?.pagination.totalCount || 0}  
          loading={isLoading}
        />
      </Box>
  );
};

export default ProductTable;
