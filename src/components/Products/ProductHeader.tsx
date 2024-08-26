
import { Box, } from "@mui/material"
import { ColorSet } from "../../Theme"
import { Pagination } from "../../app/models/Pagination/pagination"
import { FC } from "react"
import Header from "../Other/Header"


type Props = { 
    colors: ColorSet;
    pageModel:Pagination;
    handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddProduct: () => void;
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProductHeader: FC<Props> = ({
    colors,
    pageModel,
    handleSearchTermChange,
    handleAddProduct,
    toggle,
    setToggle,

}) => {
  return (
    <Box pb={1} display={'flex'} gap={3}  alignItems={'center'} justifyContent={'space-between'} >
        <Header
            title={'Products'}
            colors={colors}
            toggle={toggle}
            setToggle={setToggle}
            pageModel={pageModel}
            onAddHandler={handleAddProduct}
            searchTermHandler={handleSearchTermChange}
        />
    </Box>
  )
}
export default ProductHeader