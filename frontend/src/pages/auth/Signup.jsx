import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { OTP, signUp } from "../../actions/api.call";
import toast from "react-hot-toast";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    otp: "",
    isAdmin: "" || false,
  });
  const [nextPage, setNextPage] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    const res = await OTP(input);
    console.log(res);

    if (res?.data?.success) {
      toast.success(res.data.message);
      setNextPage(true);
    } else {
      toast.error(res?.response?.data?.message || "SignUp failed. Try again.");
    }
  };

  const userSignUp = async (e) => {
    e.preventDefault();
    console.log(input);

    const res = await signUp(input);
    if (res?.data?.success) {
      toast.success(res.data.message);
      navigate("/login");
    } else {
      toast.error(res?.response?.data?.message || "SignUp failed. Try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Id")) {
      navigate("/");
    }
  });

  return (
    <div className="bg-[#5f646b] p-4 h-screen flex items-center justify-center">
      <form onSubmit={nextPage ? userSignUp : sendOTP}>
        <div className="flex flex-col gap-4 bg-white p-9 rounded-md w-96">
          {!nextPage ? (
            <>
              <TextField
                label="Enter Your Name"
                variant="standard"
                name="fullName"
                value={input.fullName}
                onChange={handleChange}
                required
              />
              <TextField
                label="Enter Phone Number"
                type="number"
                variant="standard"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleChange}
                required
              />
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
                Send OTP
              </button>
            </>
          ) : (
            <>
              <TextField
                label="Enter Your OTP"
                variant="standard"
                name="otp"
                type="number"
                value={input.otp}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="bg-[#2874F0] p-3 rounded-lg text-white"
              >
                Verify OTP
              </button>
            </>
          )}
          <NavLink to={"/login"} className="hover:text-blue-800">
            Existing User? Log in
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Signup;
