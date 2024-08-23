import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slice/apiSlice";
import modalSliceReducer  from "./Slice/modalSlice";
import authSliceReducer from "./Slice/authSlice";
import orderSliceReducer from "./Slice/OrderSlice";

export const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      modal: modalSliceReducer ,
      auth: authSliceReducer,
      order: orderSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
