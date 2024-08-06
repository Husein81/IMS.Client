/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { ColorSet } from "../../Theme"
import { Customer } from "../../app/models/Customer";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteCustomerMutation } from "../../app/redux/Slice/customerApi";
import { useDispatch } from "react-redux";

type Props = {
    colors: ColorSet;
    customers:Customer[];
    refetch: () => any;
}
const CustomerTable: React.FC<Props> = ({ colors, customers, refetch }) => {
    const dispatch = useDispatch();
    const [deleteCustomer] = useDeleteCustomerMutation();

    const handleDelete = async (id: string) => {
        try{
            dispatch(await deleteCustomer(id).unwrap());
        }catch(err){
            console.log(err);
        }
        refetch();
    }
    const DataGridStyle = {
        height: 500,
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
    const columns: GridColDef[] = [
        {field:'name', headerName:'Name', width: 200},
        {field:'email', headerName:'Email', width: 200},
        {field:'address', headerName:'Address', width: 200},
        {field:'phone', headerName:'Phone', width: 200},
        {field:'Actions', headerName:'Actions', width: 200,
            renderCell: (params) => (
                <Box display={'flex'} alignItems={'center'} gap={1}>
                    <IconButton>
                        <Edit/>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <Delete/>
                    </IconButton>
                </Box>
            )
        }
    ]

    
  return (
    <Box>
        <DataGrid
            sx={DataGridStyle}
            rows={customers}
            columns={columns}
        />
    </Box>
  )
}
export default CustomerTable