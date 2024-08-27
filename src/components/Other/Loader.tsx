import { Box, CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  color?: string;
}
const Loader: React.FC<Props> = ({ color = "#0080ff" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <CircularProgress sx={{ color: `${color}` }} />
    </Box>
  );
};

export default Loader;
