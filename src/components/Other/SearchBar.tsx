import { Search } from "@mui/icons-material"
import { Box, IconButton, InputBase } from "@mui/material"
import { FC } from "react";
import { ColorSet } from "../../Theme";
import { Pagination } from "../../app/models/Pagination/pagination";

type Props = {
    colors: ColorSet;
    pageModel: Pagination;
    searchTermHandler : (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar: FC<Props> = ({
    colors,
    pageModel,
    searchTermHandler
}) => {
    const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchTermHandler(e);
    }
  return (
    <Box
        display={'flex'}
        borderRadius={1}
        px={1}
        bgcolor={colors.white[500]}
        width={'100%'}
    >
        <InputBase
            sx={{p:1,color:colors.black[500], flex:1}}
            placeholder="Search"
            name="search"
            type="search"
            value={pageModel.searchTerm}
           onChange={onSearchHandler}
        />
        <IconButton sx={{color:colors.black[500]}}>
            <Search/>
        </IconButton>
    </Box>
  )
}
export default SearchBar