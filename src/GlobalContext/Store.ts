import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/Users/userSlice";
import productReducer from './Features/Products/productSlice'
import CartReducer from './Features/Cart/CartSlice'

export const Store = configureStore({
    reducer:{
        userReducer,
        productReducer,
        CartReducer
    }
})


export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;