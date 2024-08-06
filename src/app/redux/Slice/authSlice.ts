import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";

interface AuthState {
    userInfo: User | null;
}
const initialState: AuthState = {
    userInfo:  localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo') as string) 
        : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
        setCredentials: (state, action: PayloadAction<User>) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;