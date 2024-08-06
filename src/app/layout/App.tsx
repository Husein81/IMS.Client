import { Box, Container } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import HomePage from "./HomePage"
import ModalContainer from "../../components/Modals/ModalContainer"
import SideBar from "../../components/OtherComponents/SideBar"
import { ColorModeContext, token, useMode } from "../../Theme"
import { ThemeProvider } from "@emotion/react"
// import NavBar from "../../components/OtherComponents/NavBar"

function App() {
  const [theme, colorMode] = useMode();
  const colors = token(theme.palette.mode);
  const location = useLocation();
  return (
    <>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> 
      <ModalContainer/>
        {location.pathname === '/' ? <HomePage/> : 
          (
            <Box
            className="flex"
            sx={{
              height:'100%',
              minHeight:'100vh',
              backgroundColor:colors.gray[900],
            }}
            >
              <SideBar/>
              <Container sx={{pt:3,}}>
                {/* <NavBar/> */}
                <Outlet/>
              </Container>
            </Box>
          )
        }
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App
