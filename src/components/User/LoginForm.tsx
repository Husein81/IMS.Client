import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  // IconButton,
  // InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { User } from "../../app/models/User";
import { useLoginMutation } from "../../app/redux/Slice/userApi";
import { useNavigate } from "react-router-dom";
import { closeModal, openModal } from "../../app/redux/Slice/modalSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/redux/Slice/authSlice";
import RegisterForm from "./RegisterForm";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading: isLoginLoading, isError }] = useLoginMutation();

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });
  // const [showPassword, setShowPassword] = useState(false);

  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const handleMouseDownPassword = (event: React.FormEvent) => {
  //   event.preventDefault();
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleOpen = () => {
    dispatch(openModal(<RegisterForm />));
  };
  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleRegistration = () => {
    handleClose();
    handleOpen();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(user).unwrap();
      dispatch(setCredentials(response));
      handleClose();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      component={"form"}
      autoComplete={"off"}
      sx={{ p: 1 }}
      onSubmit={handleSubmit}
    >
      <FormControl component={"fieldset"} fullWidth>
        <FormLabel component={"legend"}>
          <Typography variant="h3">Login</Typography>
        </FormLabel>
        <FormGroup>
          <TextField
            required
            name="username"
            label="Username"
            variant="outlined"
            margin="dense"
            onChange={handleChange}
          />
          <TextField
            type={"password"}
            label="Password"
            required
            variant="outlined"
            fullWidth
            sx={{
              mt: 1,
              mb: 2,
            }}
            value={user.password}
            name="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isLoginLoading}
            color="primary"
          >
            {isLoginLoading ? "Submitting..." : "Submit"}
          </Button>
          {isError && (
            <Typography variant="body1" color="error">
              Invalid Username or Password
            </Typography>
          )}
        </FormGroup>
        <Typography variant="body1" align="center">
          Don't have account?{" "}
          <Button variant={"text"} onClick={handleRegistration}>
            Create account
          </Button>
        </Typography>
      </FormControl>
    </Container>
  );
};
export default LoginForm;
