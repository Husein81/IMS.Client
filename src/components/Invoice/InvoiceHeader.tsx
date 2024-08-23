import { Assignment, Search } from "@mui/icons-material"
import { Box, Button, IconButton, InputBase, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { ColorSet } from "../../Theme"
import { Pagination } from "../../app/models/Pagination/pagination"
import { FC } from "react"

type Props = {
    colors: ColorSet;
    pageModel: Pagination;
    handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InvoiceHeader: FC<Props> = ({ colors, pageModel, handleSearchTermChange}) => {
  return (
    <Box py={2}  display={'flex'} alignItems={'center'}  justifyContent={'space-between'} gap={2}>
        <Typography variant="h3" gutterBottom>Invoice</Typography>
    <Box
      display={'flex'}
      borderRadius={'3px'}
      bgcolor={colors.white[500]}
      height={'50px'}
      width={'100%'}>
      <InputBase
        sx={{ mx: 2, flex: 1, bgcolor: colors.white[500], color: 'black' }}
        placeholder="Search"
        name="searchTerm"
        type="search"
        value={pageModel.searchTerm}
        onChange={handleSearchTermChange}
        />
      <IconButton sx={{ borderRadius: 1, p: 1 }}>
        <Search />
      </IconButton>
    </Box>
    <Box width={240}>
      <Link to='/completedInvoice'>
        <Button variant="contained" sx={{height:'50px'}}>
            <Assignment/>
        </Button>
      </Link>
    </Box>
  </Box>
  )
}
export default InvoiceHeader