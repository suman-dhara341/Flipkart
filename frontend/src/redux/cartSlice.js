import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartItemsAddressId: null,
  totalAmount: 0,
  cartItemChange: true,
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartItemsAddress: (state, action) => {
      state.cartItemsAddressId = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setCartItemChange: (state, action) => {
      state.cartItemChange = !state.cartItemChange;
    },
  },
});

export const {
  setCartItems,
  setCartItemsAddress,
  setTotalAmount,
  setCartItemChange,
} = cart.actions;

export default cart.reducer;
