import { configureStore } from "@reduxjs/toolkit";
import authProfileReducer from "./authSlice";
import cartReducer from "./cartSlice";
import adminReducer from "./adminSlice.js";

export const store = configureStore({
  reducer: {
    profile: authProfileReducer,
    cart: cartReducer,
    admin:adminReducer
  },
});
