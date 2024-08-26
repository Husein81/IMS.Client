
import { FC } from "react";
import { ColorSet } from "../../../Theme";
import { Pagination } from "../../../app/models/Pagination/pagination";
import Header from "../../Other/Header";
type Props = {
    colors: ColorSet;
    pageModel: Pagination;
    handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CompletedInvoiceHeader: FC<Props> = ({ 
    colors,
    pageModel,
    handleSearchTermChange
}) => {
  return (
    <Header
      title={'Completed'}
      isCompletedInvoice={true}
      isInvoice={true}
      colors={colors}
      pageModel={pageModel}
      searchTermHandler={handleSearchTermChange}
    />
  )
}
export default CompletedInvoiceHeader