import { Add, GridOn, Search, TableRows } from "@mui/icons-material"
import { Box, Button, IconButton, InputBase, Typography } from "@mui/material"
import ProductsFilter from "./ProductsFilter"
import { ColorSet } from "../../Theme"
import { Pagination } from "../../app/models/Pagination/pagination"
import { Category } from "../../app/models/Category"
import { FC } from "react"


type Props = { 
    colors: ColorSet;
    pageModel:Pagination;
    handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddProduct: () => void;
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    categories:Category[];
    setCategory: React.Dispatch<React.SetStateAction<Category | null>>;
    selectCategoryHabdler: (category: Category) => void;
}
const ProductHeader: FC<Props> = ({
    colors,
    pageModel,
    handleSearchTermChange,
    handleAddProduct,
    toggle,
    setToggle,
    categories,
    setCategory,
    selectCategoryHabdler
}) => {
  return (
    <Box>
        <Box pb={1} display={'flex'} gap={3}  alignItems={'center'} justifyContent={'space-between'} >
            <Typography variant='h3' >
                Products
            </Typography>
            <Box 
            display={'flex'}
            borderRadius={'3px'}
            bgcolor={colors.white[500]}
            height={'45px'}
            width={'100%'}>
                <InputBase
                sx={{ mx:2, flex:1,bgcolor:colors.white[500], color:'black'}}
                placeholder="Search"
                name="searchTerm"
                type="search"
                value={pageModel.searchTerm}
                onChange={handleSearchTermChange}
                />
                <IconButton sx={{borderRadius:1, p:1}}>
                <Search/>
                </IconButton>
            </Box>
            <Box display={'flex'} height={"40px"} gap={1}>
                <Button 
                    variant='contained' 
                    color="primary"
                    sx={{color:colors.white[500]}} 
                    onClick={handleAddProduct}>
                    <Add/>
                </Button>
                <Button variant="contained" color="primary"
                    onClick={() => setToggle(!toggle)}>
                    {toggle ? <GridOn/> : <TableRows />  }
                </Button>
            </Box>
        </Box>
        <Box>
            <ProductsFilter 
                categories={categories || []} 
                setCategory={setCategory} 
                selectCategoryHandler={selectCategoryHabdler}/>
        </Box>
    </Box>
  )
}
export default ProductHeader