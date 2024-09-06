import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface Items{
    id: number,
    title: string,
    price: number,
    quantity: number
}

interface InitialState{
    items: Items[],
    totalPrice: number,
    loading: boolean
}


const initialState: InitialState = {
    items:  [],
    totalPrice: 0,
    loading: true
};

const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        getFromCookies: (state) => {
            const products = Cookies.get("Cart");
            if (products) {
                try {
                    state.items = JSON.parse(products);
                } catch (error) {
                    console.error("Error parsing JSON from cookies:", error);
                    state.items = [];
                }
            } else {
                state.items = [];
            }
            state.loading = false;
        },
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(action.payload);
            }
            Cookies.set("Cart", JSON.stringify(state.items));
        },
        removeOne: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload);
                }
            }
            Cookies.set("Cart", JSON.stringify(state.items));
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            Cookies.set("Cart", JSON.stringify(state.items));
        },
        updatePrice: (state) => {
            let total = 0;
            for (let i = 0; i < state.items.length; i++) {
                total += state.items[i].price * state.items[i].quantity;
            }
            state.totalPrice = total;
        }
    }
});


export const {addItem, removeItem, updatePrice, removeOne, getFromCookies} = CartSlice.actions;
export default CartSlice.reducer;