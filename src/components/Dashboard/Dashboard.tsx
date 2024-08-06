import { Box, Button, Container, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { logout } from "../../app/redux/Slice/authSlice";


const DashboardPage = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
  return (
        <Container>
            <Box pt={2}>
                <Typography variant='h1'>Dashboard</Typography>
                <Typography variant='h4'><Link to="/">Go Home</Link>
                </Typography>
                <Button onClick={handleLogout}>Logout</Button>
            </Box>
        </Container>
  )
}
export default DashboardPage