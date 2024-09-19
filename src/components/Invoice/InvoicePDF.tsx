// InvoicePDF.tsx
import React from "react";
import { Order } from "../../app/models/Order";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@mui/material";
import { token } from "../../Theme";

interface InvoiceProps {
  invoice: Order | undefined;
}

const InvoicePDF: React.FC<InvoiceProps> = ({ invoice }) => {

  const colors = token();
  const timeHour: number | string = invoice?.createdAt
    ? Number(invoice.createdAt.split("T")[1].split(".")[0].split(":")[0])
    : 0;
  const timeMinute: number | string = invoice?.createdAt
    ? invoice.createdAt.split("T")[1].split(".")[0].split(":")[1]
    : 0;
  return (
    <Box sx={{ bgcolor: "#fefefe", borderRadius: 1 }}>
      <Box p={2}>
        <Typography
          variant="h3"
          gutterBottom
          textAlign={"left"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Nasrallah Ceramic{" "}
          <Box component={"span"} textAlign={"right"}>
            نصرالله للسيراميك
          </Box>
        </Typography>
        <Typography variant="h6" gutterBottom textAlign={"left"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              component={"span"}
              fontWeight={400}
              textTransform={"capitalize"}
            >
              Address: El Bezourieh, main street
            </Box>
            <Box
              component={"span"}
              fontWeight={400}
              textTransform={"capitalize"}
            >
              {" "}
              العنوان: صور ، البازورية ، الشارع العام
            </Box>
          </Box>
        </Typography>
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          Invoice <br /> فاتورة مبيع
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Typography variant="h5">
              Invoice Date:
              <Typography
                variant="subtitle1"
                textAlign={"left"}
                sx={{ color: colors.black[600] }}
              >
                {invoice?.createdAt
                  ? new Date(invoice.createdAt).toLocaleDateString("en-GB")
                  : ""}
              </Typography>
            </Typography>{" "}
            <Typography variant="h5">
              Invoice Time:
              <Typography
                variant="subtitle1"
                textAlign={"left"}
                sx={{ color: colors.black[600] }}
              >
                {(timeHour % 12 == 0 ? "12" : timeHour % 12) +
                  ":" +
                  timeMinute +
                  " " +
                  (timeHour > 11 ? "PM" : "AM")}
              </Typography>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" textAlign={"right"}>
              : رقم الفاتورة / Invoice ID
              <Typography
                variant="subtitle1"
                textAlign={"right"}
                sx={{ color: colors.black[600] }}
              >
                {invoice?.id?.split("-")[0]}
              </Typography>
            </Typography>
            <Typography variant="h5">
              : الاسم والعنوان / Customer Name & Address
              <Typography
                variant="subtitle1"
                textAlign={"right"}
                sx={{ color: colors.black[600] }}
              >
                {invoice?.customer?.name}: الاسم / Name
                <br />
                {invoice?.customer?.address ? invoice?.customer?.address : ""} :
                العنوان / Address
                <br />
                {invoice?.customer?.phone ? invoice?.customer?.phone : ""}{" "}
                :الهاتف / Phone
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
      <TableContainer sx={{ bgcolor: "#fff" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#242424" }}>Product / المنتج</TableCell>
              <TableCell sx={{ color: "#242424" }}>
                Description / الوصف
              </TableCell>
              <TableCell sx={{ color: "#242424" }} align="right">
                Quantity / الكمية
              </TableCell>
              <TableCell sx={{ color: "#242424" }} align="right">
                Price / السعر
              </TableCell>
              <TableCell sx={{ color: "#242424" }} align="right">
                Discount / حسم
              </TableCell>
              <TableCell sx={{ color: "#242424" }} align="right">
                Total / المجموع
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice?.orderItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: colors.black[500] }}>
                  {item.product?.name}
                </TableCell>
                <TableCell sx={{ color: colors.black[500] }}>
                  {item.product?.description}
                </TableCell>
                <TableCell align="right" sx={{ color: colors.black[500] }}>
                  {item.qty}
                </TableCell>
                <TableCell align="right" sx={{ color: colors.black[500] }}>
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={{ color: colors.black[500] }}>
                  %{item.discount}
                </TableCell>
                <TableCell align="right" sx={{ color: colors.black[500] }}>
                  $
                  {(
                    item.qty * item.price -
                    (item.qty * item.price * item.discount) / 100
                  ).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} sx={{ color: "#242424" }}>
                <strong>Total Amount / المبلغ الاجمالي</strong>
              </TableCell>
              <TableCell align="right" sx={{ color: "#242424" }}>
                <strong>${invoice?.totalAmount.toFixed(2)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box p={6} display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Typography variant="h6">
              Client Signature / التوقيع الخاص بالعميل
            </Typography>
            <Typography variant="h5" py={2.5}>
              ------------------------------------------
            </Typography>
          </Box>
          <Typography variant="h6" textAlign={"right"}>
            {" "}
            ${invoice?.totalAmount.toFixed(2)} : المبلغ الاجمالي / Total Amount{" "}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          pb={2}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Typography variant="subtitle2" textAlign={"center"}>
            استلمت البضاعة طبقا لمواصفات هذه الفاتورة بحالة جيدة.
          </Typography>
          <Typography variant="subtitle2" textAlign={"center"}>
            I recevied the items accordance with the specifications of this
            invoice in good condition.
          </Typography>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default InvoicePDF;
