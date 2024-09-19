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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ color: `${color}` }} />
    </Box>
  );
};

export default Loader;
