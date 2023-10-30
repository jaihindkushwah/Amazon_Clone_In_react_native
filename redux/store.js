import { configureStore } from "@reduxjs/toolkit";
import { cartReducers } from "./cartSlice";

export const store=configureStore({
        reducer:{
            cart:cartReducers,
        }
});