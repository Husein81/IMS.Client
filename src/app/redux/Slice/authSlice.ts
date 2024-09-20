import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";

interface AuthState {
  userInfo: User | null;
}

const loadUserAction = async () => {
  try {
    const response = await localStorage.getItem("userInfo");
    return response ? JSON.parse(response) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const initialState: AuthState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    loginAction: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setCredentials: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setCredentials, logout, loginAction } = authSlice.actions;
export default authSlice.reducer;

export const loadUser = () => async (dispatch) => {
  const user = await loadUserAction();
  if (user) {
    dispatch(setCredentials(user));
  }
};
