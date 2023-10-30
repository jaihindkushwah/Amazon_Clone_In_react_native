import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const itemPresent=state.cart.find((item)=>item.id===action.payload.id);
        if(itemPresent){
            itemPresent.quantity++;
        }else{
            state.cart.push({ ...action.payload, quantity: 1 });
        }

    },
    removeToCart: (state, action) => {
        const removedItems=state.cart.filter((item)=>item.id!==action.payload.id);
        state.cart=removedItems;
    },
    incrementQuantity: (state, action) => {
        const itemPresent=state.cart.find((item)=>item.id===action.payload.id);
        itemPresent.quantity++;
        
    },
    decrementQuantity: (state, action) => {
        const itemPresent=state.cart.find((item)=>item.id===action.payload.id);
        if(itemPresent.quantity===1){
            const removedItems=state.cart.filter((item)=>item.id!==action.payload.id);
            state.cart=removedItems;
        }else{
            itemPresent.quantity--;
        }
    },
    cleanCart: (state, action) => ({ cart: [] }),
  },
});

export const {addToCart,removeToCart,incrementQuantity,decrementQuantity,cleanCart} = cartSlice.actions;

export const cartReducers=cartSlice.reducer;
