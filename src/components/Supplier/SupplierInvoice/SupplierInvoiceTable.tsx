import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { ProductPagination } from "../../../app/models/Pagination/ProductPagination";
import { Pagination } from "../../../app/models/Pagination/pagination";
import { ColorSet } from "../../../Theme";
import Loader from "../../OtherComponents/Loader";


type Props ={
    colors: ColorSet
    data: ProductPagination,
    isLoading: boolean,
    pageModel: Pagination,
    handlePaginationChange: (model: Pagination) => void
}
const SupplierInvoiceTable: React.FC<Props> = ({colors, data,isLoading, pageModel, handlePaginationChange}) => {

    const columns: GridColDef[] = [
        {field:'name', headerName:'Name', width: 100},
        { field: 'imageUrls', headerName: 'Image URL', width: 100, renderCell: (params) => (
            <Box component={'img'} loading="lazy" src={params.row.imageUrls[0]} alt="product image" width={50} height={50} />
          ),},
          
        {field:'description', headerName:'Description', width: 200},
        {field:'cost', headerName:'Cost', width: 100},
        {field:'quantity', headerName:'Quantity', width: 100},
        {field:'price', headerName:'Price', width: 100},
        {field:'total', headerName:'Total', width: 100,
            renderCell: (params) => (
                <Box>{params.row.price * params.row.quantity}</Box>
            )
        },
        
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

      if(isLoading) return <Loader />
  return (
    <DataGrid
        sx={DataGridStyle}
        initialState={initialState}
        rows={data?.items || []}
        columns={columns}
        paginationMode="server"
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={{ pageSize: pageModel.pageSize, page: pageModel.page }}
        onPaginationModelChange={(model) => handlePaginationChange(model)}
        rowCount={data?.pagination.totalCount || 0}  
        loading={isLoading}
   />
  )
}
export default SupplierInvoiceTable