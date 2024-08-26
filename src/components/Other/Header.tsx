import { AppBar, Box, IconButton, Typography } from "@mui/material"
import { Add, Assignment, GridOn, List, TableRows } from "@mui/icons-material"
import { FC } from "react"
import { ColorSet } from "../../Theme";
import { Pagination } from "../../app/models/Pagination/pagination";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

type Props = {
    title: string;
    toggle?: boolean ;
    isInvoice?: boolean;
    isCompletedInvoice?: boolean;
    setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
    colors: ColorSet;
    pageModel: Pagination;
    onAddHandler?: () => void;
    searchTermHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Header: FC<Props> = ({
    title,
    isInvoice = false,
    isCompletedInvoice = false,
    toggle,
    setToggle,
    colors,
    pageModel,
    onAddHandler,
    searchTermHandler
}) => {
    
  return (
    <AppBar  position="static" elevation={1} sx={{bgcolor:colors.black[500], borderRadius:1 , mb:2}}> 
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={1} gap={2}>
            <Box>
                <Typography variant="h4" pl={1} sx={{color:colors.white[500]}}>
                   {title}
                </Typography>
            </Box>
            <Box 
                width={'100%'}
            >
                <SearchBar
                    colors={colors}
                    pageModel={pageModel}
                    searchTermHandler={searchTermHandler}
                />
            </Box>
            {isInvoice ?
                (
                    isCompletedInvoice ?
                        <Box mx={2}>
                            <Link to='/invoice'>
                                <IconButton color="secondary" >
                                    <List/>
                                </IconButton>
                            </Link>
                        </Box>
                        :
                        (<Box mx={2}>
                            <Link to='/completedInvoice'>
                                <IconButton color="secondary" >
                                    <Assignment/>
                                </IconButton>
                            </Link>
                        </Box>)
                ) 
                : (
                <Box mx={2} onClick={onAddHandler}>
                    <IconButton>
                        <Add color="secondary"/>
                    </IconButton>
                </Box>
            )}

            {(toggle === false || toggle === true) ? 
                (<Box mx={2}>
                    <IconButton color="secondary" onClick={() => setToggle(!toggle)}>
                        {toggle ? <TableRows/> : <GridOn/>}
                    </IconButton>
                </Box>
                )
                : ''
            }
        </Box>
    </AppBar>
  )
}
export default Header