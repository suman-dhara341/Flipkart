import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  productsUpdate: true,
  orders: null,
  ordersUpdate: true,
};

export const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductsUpdate: (state, action) => {
      state.productsUpdate = !state.productsUpdate;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrdersUpdate: (state, action) => {
      state.ordersUpdate = !state.ordersUpdate;
    },
  },
});

export const { setProducts, setProductsUpdate, setOrders, setOrdersUpdate } =
  admin.actions;

export default admin.reducer;
