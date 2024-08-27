import { PersonAddAlt1 } from "@mui/icons-material";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { ColorSet } from "../../Theme";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  handleOpenCustomerModal: () => void;
  colors: ColorSet;
};
const CustomerInfo: FC<Props> = ({ colors, handleOpenCustomerModal }) => {
  const navigate = useNavigate();
  return (
    <Paper elevation={3} sx={{ bgcolor: colors.white[500], my: 1 }}>
      <Box p={2}>
        <Box>
          <Typography variant="h4">Customer Information</Typography>
        </Box>
        <Box
          display={"flex"}
          gap={2}
          py={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <IconButton onClick={handleOpenCustomerModal} color={"secondary"}>
              <PersonAddAlt1 />
            </IconButton>
          </Box>
          <Box>
            <Button
              variant="outlined"
              sx={{ cursor: "pointer", color: colors.black[500] }}
              onClick={() => navigate("/customers")}
            >
              View Customers
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
export default CustomerInfo;
