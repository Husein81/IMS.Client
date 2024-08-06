import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Modal{
    open: boolean;
    body: JSX.Element | null;
}

const initialState: Modal = {
    open: false,
    body: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<JSX.Element>) => {
            state.open = true;
            state.body = action.payload;
        },
        closeModal: (state) => {
            state.open = false;
            state.body = null;
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;