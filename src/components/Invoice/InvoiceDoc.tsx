/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button } from "@mui/material";
import Loader from "../Other/Loader";
import { useGetOrderQuery } from "../../app/redux/Slice/orderApi";
import InvoicePDF from "./InvoicePDF";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";

const InvoiceDoc = () => {
  const { id } = useParams<{ id: string }>();
  const { data: invoice, isLoading } = useGetOrderQuery(id!);

  const handleDownload = () => {
    const element = document.getElementById("invoice");
    const options = {
      margin: 0.1,
      filename: `invoice-${invoice?.id?.split("-")[0]}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };
  if (isLoading) return <Loader />;
  return (
    <Box m={4}>
      <Box id="invoice">
        <InvoicePDF invoice={invoice!} />
      </Box>
      <br />
      <Button variant="contained" fullWidth onClick={handleDownload}>
        Download
      </Button>
    </Box>
  );
};
export default InvoiceDoc;
