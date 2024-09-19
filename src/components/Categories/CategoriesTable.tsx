/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { ColorSet } from "../../Theme";
import { useDeleteCategoryMutation } from "../../app/redux/Slice/categoryApi";
import Loader from "../Other/Loader";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/redux/Slice/modalSlice";
import CategoriesForm from "./CategoriesForm";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import { useState } from "react";
import { Pagination } from "../../app/models/Pagination/pagination";
import { CategoryPagination } from "../../app/models/Pagination/CategoryPagination";
import DeletingForm from "../Other/DeletingForm";

interface Props {
  colors: ColorSet;
  categories: CategoryPagination;
  isLoading: boolean;
  refetch: () => any;
}
const CategoriesTable: React.FC<Props> = ({
  colors,
  isLoading,
  refetch,
  categories: data,
}) => {
  const dispatch = useDispatch();
  const [pageModal, setPageModal] = useState<Pagination>({
    page: 0,
    pageSize: 10,
  });

  const categories = data?.items.map((category) => {
    return {
      ...category,
    };
  });

  const [deleteCategory, { isLoading: isLoadingDelete }] =
    useDeleteCategoryMutation();

  const handleEdit = (id: string) => {
    dispatch(openModal(<CategoriesForm refetch={refetch} id={id} />));
  };
  const deleteHandler = async (id: string) => {
    dispatch(
      openModal(
        <DeletingForm deleteItem={() => deleteCategory(id)} refetch={refetch} />
      )
    );
  };

  const handlePaginationChange = (modal: GridPaginationModel) => {
    setPageModal(modal);
    refetch();
  };
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
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "imageUrls",
      headerName: "Image",
      width: 250,
      renderCell: (params) => (
        <Box
          component={"img"}
          src={params.row.imageUrls[0]}
          alt={params.row.name}
          width={50}
          height={50}
        />
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
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
    pagination: {
      paginationModel: {
        page: pageModal.page + 1,
        pageSize: pageModal.pageSize,
      },
    },
  };

  if (isLoading) return <Loader color={colors.blue[500]} />;
  return (
    <Box sx={{ height: 400 }}>
      <DataGrid
        getRowId={(row) => row.id}
        sx={DataGridStyle}
        rows={categories}
        columns={columns}
        paginationMode="server"
        initialState={initialState}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={{ pageSize: pageModal.pageSize, page: pageModal.page }}
        onPaginationModelChange={handlePaginationChange}
        rowCount={data?.pagination.totalCount || 0}
        loading={isLoading}
      />
    </Box>
  );
};
export default CategoriesTable;
