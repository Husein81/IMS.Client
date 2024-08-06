import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface Props{
  color?: string;
}
const Loader: React.FC<Props> = ({ color = "#fefefe" }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'50vh' }}>
      <CircularProgress sx={{color:`${color}`}}/>
    </Box>
  );
};

export default Loader;
