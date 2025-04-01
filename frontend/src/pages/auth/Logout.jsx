import React, { useEffect } from "react";
import { logout } from "../../actions/api.call";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutApi = async () => {
    const res = await logout();
    if (res?.data?.success) {
      toast.success(res.data.message);
      localStorage.removeItem("Id");
      navigate("/login");
      dispatch(auth(""));
    } else {
      toast.error(res.response?.data?.message || "Logout failed. Try again.");
    }
  };

  useEffect(() => {
    logoutApi();
  }, []);
  return <></>;
};

export default Logout;
