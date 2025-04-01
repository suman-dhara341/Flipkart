import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: "",
  wishlist: null,
  Id: localStorage.getItem("Id") || "",
};

export const authProfile = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.auth = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

export const { auth, setWishlist } = authProfile.actions;

export default authProfile.reducer;
