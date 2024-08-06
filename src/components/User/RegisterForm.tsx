import { 
    Box, 
    Button, 
    Container, 
    FormControl, 
    FormGroup, 
    FormLabel, 
    IconButton, 
    InputAdornment, 
    TextField, 
    Typography
} from "@mui/material"
import { useState } from "react";
import { User } from "../../app/models/User";
import { useRegisterMutation } from "../../app/redux/Slice/userApi";
import { useNavigate } from "react-router-dom";
import { closeModal, openModal } from "../../app/redux/Slice/modalSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/redux/Slice/authSlice";
import LoginForm from "./LoginForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, {isLoading, isError}] = useRegisterMutation();

    const [user, setUser] = useState<User>({
        displayName:'',
        username: '',
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event: React.FormEvent) => {
      event.preventDefault();
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
        setUser({...user, [e.target.name]: e.target.value});
    }


    const handleOpen = () => {
        dispatch(openModal(<LoginForm/>));
    }
    const handleClose = () => {
        dispatch(closeModal());
    }
    const handleLogin = () => {
        handleClose();
        handleOpen();
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await register(user).unwrap();
            dispatch(setCredentials(response));
            handleClose();
            navigate('/dashboard');
        }catch(error){
            console.log(error);
        }
    }
  return (
    <Container component={'form'} autoComplete={"off"} sx={{p:1}} onSubmit={handleSubmit}>
        <FormControl component={'fieldset'} fullWidth>
            <FormLabel component={'legend'} >
                <Typography variant='h3'>Register</Typography>
            </FormLabel>
            <FormGroup>
                <Box display={'flex'} gap={2}>
                    <TextField  
                        required
                        name="displayName"
                        label="Display Name"
                        variant="outlined"
                        margin="dense"
                        onChange={handleChange}
                        />
                    <TextField
                        required
                        name="username"
                        label="Username"
                        variant="outlined"
                        margin="dense"
                        onChange={handleChange}
                />
                </Box>
                <TextField
                    type="email"
                    required
                    name="email"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    onChange={handleChange}
                />
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    variant="outlined"
                    sx={{
                        mt:1,
                        mb:2
                    }}
                    value={user.password}
                    name="password"
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />
                <Button 
                    type="submit" 
                    variant="contained"
                    disabled={isLoading} 
                    color="primary">
                    {isLoading ? "Submitting" : "Submit"}
                </Button>
                {isError && <Typography variant='body1' color='error'>Registration Failed</Typography>}
            </FormGroup>
            <Typography variant='body1' align='center'>
                Already have an account? <Button variant={'text'} onClick={handleLogin}>Login</Button>
            </Typography>
        </FormControl>
    </Container>
  )
}
export default RegisterForm