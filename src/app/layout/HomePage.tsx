import { Box, Button, Typography } from "@mui/material";
import { token } from "../../Theme";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/Slice/modalSlice";
import LoginForm from "../../components/User/LoginForm";
import { RootState } from "../redux/Store";
import { Link } from "react-router-dom";
import { logout } from "../redux/Slice/authSlice";

const HomePage = () => {
  const colors = token();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleOpenModal = (body: JSX.Element) => {
    dispatch(openModal(body));
  };

  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        background: `linear-gradient(45deg, ${colors.black[500]} 30%, ${colors.black[300]} 70%)`,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
      }}
    >
      <Box
        component={"img"}
        src={"/assets/OIP.jpg"}
        alt="logo"
        borderRadius={1}
        width={200}
        height={200}
      />
      <Typography variant="h1" align="center" color="white">
        Welcome To The Inventory System
      </Typography>
      {!userInfo ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpenModal(<LoginForm />)}
        >
          Login
        </Button>
      ) : (
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Typography variant="h3" color="white">
            <Link to="/dashboard">Go To Dashboard</Link>
          </Typography>
          <Button variant={"contained"} color="secondary" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default HomePage;
