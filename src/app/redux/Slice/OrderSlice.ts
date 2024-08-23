import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderItem } from "../../models/OrderItem";
import { OrderState, updateCart } from "../../utils/ordertUtils";


const initialState: OrderState = localStorage.getItem('cart') ? 
  JSON.parse(localStorage.getItem('cart') as string) : {orderItems: []};
  
  if (!Array.isArray(initialState.orderItems)) {
    initialState.orderItems = [];
  }
const orderSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<OrderItem>) => {
            const item = action.payload;
            const existItem = state.orderItems.find((x: OrderItem) => x.productId === item.productId);
      
            if (existItem) {
              if (item.qty <= 0) {
                state.orderItems = state.orderItems.filter((x: OrderItem) => x.productId !== item.productId);
              } else {
                state.orderItems = state.orderItems.map((x: OrderItem) =>
                  x.productId === existItem.productId ? item : x
                );
              }
            } else {
              state.orderItems.push(item);
            }
            return updateCart(state);
          },
        removeFromCart: (state, action: PayloadAction<string>) => {
          state.orderItems = state.orderItems.filter(
            (item: OrderItem) => item.id !== action.payload
          );
          return updateCart(state);
        },
        clearCart: (state: OrderState) => {
          state.orderItems = [];
          localStorage.removeItem('cart');
          return updateCart(state);
        }
    }
});

export const { 
    addToCart,
    removeFromCart,
    clearCart 
} = orderSlice.actions;

export default orderSlice.reducer;