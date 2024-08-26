import { Box } from "@mui/material"
import { ColorSet } from "../../Theme"
import { Pagination } from "../../app/models/Pagination/pagination"
import { FC } from "react"
import Header from "../Other/Header"

type Props = {
  colors: ColorSet;
  pageModel: Pagination;
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InvoiceHeader: FC<Props> = ({ colors, pageModel, handleSearchTermChange}) => {
  return (
    <Box>
      <Header
        title={'Invoices'}
        isInvoice={true}
        colors={colors}
        pageModel={pageModel}
        onAddHandler={() => {}}
        searchTermHandler={handleSearchTermChange}
      />
    </Box>
  )
}
export default InvoiceHeader