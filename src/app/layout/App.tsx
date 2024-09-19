import { Box, Container } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import ModalContainer from "../../components/Modals/ModalContainer";
import SideBar from "../../components/Other/SideBar";
import { token, useMode } from "../../Theme";
import { ThemeProvider } from "@mui/material/styles";
// import NavBar from "../../components/OtherComponents/NavBar"

function App() {
  const colors = token();
  const location = useLocation();
  const { theme } = useMode();
  return (
    <>
      <ThemeProvider theme={theme}>
        <ModalContainer />
        {location.pathname === "/" ? (
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
