import { 
    Box, 
    Drawer, 
    List, 
    ListItem,
    Typography, 
    useTheme 
} from "@mui/material";
import {  token } from "../../Theme";
import {  
    AttachMoney,
    Category,
    Home,  
    LocalOffer, 
    LocalShipping, 
    LoginOutlined, 
    LogoutOutlined,
    Receipt,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/Store";
import { logout } from "../../app/redux/Slice/authSlice";
import { openModal } from "../../app/redux/Slice/modalSlice";
import LoginForm from "../User/LoginForm";
import { useNavigate } from "react-router-dom";

interface Items{
    name?: string;
    icon: JSX.Element;
    onClick?: () => void;
}
const SideBar = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }
    const handleLogin = () => {
        dispatch(openModal(<LoginForm/>));
    }
    const authContent: Items =  userInfo 
    ? {name:'Logout', icon:<LogoutOutlined/>, onClick:handleLogout} 
    : {name:'Login', icon:<LoginOutlined/>, onClick:handleLogin};

    const menuItems: Items[]= [
        {name:'Dashboard',icon:<Home/> , onClick:() => navigate('/dashboard')},
        {name:'Orders', icon:<AttachMoney fontSize={'large'}/>, onClick:() => navigate('/orders')},
        {name:"Invoice",icon:<Receipt/>, onClick:() => navigate('/invoice')},
        {name:'products', icon:<LocalOffer/>, onClick:() => navigate('/products')},
        {name:'Categories', icon:<Category/>, onClick:() => navigate('/categories')},
        {name:'Suppliers', icon:<LocalShipping/>, onClick:() => navigate('/suppliers')},
        {name:authContent.name, icon:authContent.icon , onClick:authContent.onClick}
    ];

    const contet = menuItems.map((item, index) => (
        <Box className={`hover:bg-[#0080ff] `}key={index}>
            <ListItem  button  
                sx={{
                    py:'8px',
                    px:3,
                    textAlign:"center",
                    gap:1,
                    display:'flex',
                    flexDirection:'column',
                    color:colors.black[800]
                }} 
                onClick={item.onClick}>
                    {item.icon}
                <Typography variant="body1" color={colors.black[800]}>
                    {item.name}
                </Typography>
            </ListItem>
        </Box>
    ))
  return (
    <Drawer
        variant="permanent"
        sx={{
        width: 90,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 110, boxSizing: 'border-box' },
        }}
    >
        <Box px={2} py={2}>
            <Typography variant='h4' sx={{cursor:"pointer"}} color={colors.gray[900]} onClick={() => navigate('/')}>Inventory System</Typography>
        </Box>
        <List>
            {contet}
        </List>
    </Drawer>
  )
}
export default SideBar