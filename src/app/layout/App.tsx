/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import ModalContainer from "../../components/Modals/ModalContainer";
import SideBar from "../../components/Other/SideBar";
import { token, useMode } from "../../Theme";
import { ThemeProvider } from "@mui/material/styles";
import { RootState } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "../redux/Slice/authSlice";
// import NavBar from "../../components/OtherComponents/NavBar"

function App() {
  const colors = token();
  const location = useLocation();
  const { theme } = useMode();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(loadUser() as any);
  }, [dispatch]);

  console.log("userInfo", userInfo);
  return (
    <>
      <ThemeProvider theme={theme}>
        <ModalContainer />
        {location.pathname === "/" || !userInfo ? (
          <HomePage />
        ) : (
          <Box
            className="flex"
            sx={{
              height: "100%",
              minHeight: "100vh",
              backgroundColor: colors.gray[900],
            }}
          >
            <SideBar />
            <Container sx={{ pt: 3 }}>
              <Outlet />
            </Container>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
