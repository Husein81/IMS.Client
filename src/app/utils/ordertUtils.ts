import { OrderItem } from "../models/OrderItem";

export interface OrderState {
    orderItems: OrderItem[];
    itemsPrice?: string;
    totalPrice?: string;

}

export const addDecimals = (number: number) => ((number*100)/100).toFixed(2);

export const updateCart = (state: OrderState) : OrderState => {
    state.itemsPrice = addDecimals(
        state.orderItems.reduce((acc: number, item: OrderItem) => acc + item.qty* item.price - (item.qty*item.price*item.discount)/100  , 0)
    );
    
    state.totalPrice = (Number(state.itemsPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));
    return state;
}