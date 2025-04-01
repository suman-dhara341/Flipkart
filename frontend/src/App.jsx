import { BrowserRouter, Route, Routes } from "react-router-dom";
import Router from "./routers/Router";
import AdminRouter from "./routers/AdminRouter";
import { useEffect } from "react";
import { getCartItem, getProfile, getWishList } from "./actions/api.call";
import { useDispatch, useSelector } from "react-redux";
import { auth, setWishlist } from "./redux/authSlice";
import { setCartItems } from "./redux/cartSlice";

const App = () => {
  const dispatch = useDispatch();
  const cartItemChange = useSelector((state) => state?.cart?.cartItemChange);

  const getProfileData = async () => {
    const res = await getProfile();
    if (res?.data?.success) {
      localStorage.setItem("Id", res.data.isUser._id);

      dispatch(auth(res?.data?.isUser));
    } else {
      localStorage.removeItem("Id");
    }
  };

  const WishListGet = async () => {
    const res = await getWishList();
    if (res?.data?.success) {
      dispatch(setWishlist(res?.data?.wishlist?.productId));
    }
  };

  const allCartItem = async () => {
    const res = await getCartItem();

    if (res?.data?.success) {
      dispatch(setCartItems(res?.data?.getProduct));
    }
  };

  useEffect(() => {
    allCartItem();
  }, [cartItemChange]);

  useEffect(() => {
    getProfileData();
    WishListGet();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Router />
        <AdminRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
