import { AppBar, Box, Toolbar,  Typography,  useTheme } from "@mui/material"
import { RootState } from "../../app/redux/Store";
import { useSelector } from "react-redux";
import { token } from "../../Theme";
import { FC, useEffect, useState } from "react";

type Props = {
  title: string;
}
const NavBar: FC<Props> = ({ title = ""}) => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    
    const formatDateTime = (date: Date): string => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const isAm = hours < 12;
      const formattedHours = hours % 12 || 12; // convert 0 hours to 12 for AM/PM format
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const ampm = isAm ? 'am' : 'pm';
  
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
  
      return `${formattedHours}:${formattedMinutes} ${ampm} | ${month} ${day}`;
    };

    const [dateTime, setDateTime] = useState<string>('');

    useEffect(() => {
      const updateDateTime = () => {
        const now = new Date();
        const formattedDateTime = formatDateTime(now);
        setDateTime(formattedDateTime);
      };

      updateDateTime();
      const intervalId = setInterval(updateDateTime, 60000); // Update every minute

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);
  
  return (
    <AppBar sx={{bgcolor:colors.black[500],borderRadius:1}} position="static" >
        <Toolbar sx={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
          <Box>
            <Typography variant="h4" color="white" >
              {title}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color={colors.white[500]}>
              {dateTime}
            </Typography>
          </Box>
          <Box  className='cursor-pointer'>  
            {userInfo 
              ? <Box component={'img'} className="w-8 h-8 rounded-full"  
              src={userInfo.imageUrl 
              || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }/>  
              : null}
          </Box>
        </Toolbar>
    </AppBar>
  )
}
export default NavBar