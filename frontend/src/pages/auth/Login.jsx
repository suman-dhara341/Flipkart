import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { login } from "../../actions/api.call";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // const isAdminUrl = useParams();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userLogin = async (e) => {
    e.preventDefault();
    const res = await login(input);

    if (res?.data?.success) {
      toast.success(res.data.message);
      dispatch(auth(res.data.isUser));
      localStorage.setItem("Id", res.data.isUser._id);
      navigate("/");
    } else {
      toast.error(res.response?.data?.message || "Login failed. Try again.");
    }
  };

  const isUserLogin = () => {
    if (localStorage.getItem("Id")) {
      navigate("/");
    }
  };
  useEffect(() => {
    isUserLogin();
  });
  return (
    <div className="bg-[#5f646b] p-4 h-screen flex items-center justify-center">
      <form onSubmit={userLogin}>
        <div className="flex flex-col gap-4 bg-white p-9 rounded-md w-96">
          <TextField
            label="Enter Your Email Id"
            variant="standard"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Enter Your Password"
            variant="standard"
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-[#2874F0] p-3 rounded-lg text-white"
          >
            Submit
          </button>
          <NavLink to={"/signup"} className="hover:text-blue-800">
            New to Flipkart? Create an account
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
