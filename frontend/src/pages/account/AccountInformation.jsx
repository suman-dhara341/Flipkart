import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateProfile } from "../../actions/api.call";
import { toast } from "react-hot-toast";

const AccountInformation = () => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const user = useSelector((state) => state?.profile?.auth);
  const [input, setInput] = useState({
    fullName: "" || user.fullName,
    email: "" || user.email,
    phoneNumber: "" || user.phoneNumber,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile(input);
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      setInputDisabled(true);
    } else {
      toast.error(
        res.response?.data?.message || "Something was wrong. Try again."
      );
    }
  };

  return (
    <div className="bg-white px-4 flex flex-col gap-4 p-4 rounded-md shadow-md">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">Personal Information</p>
          <p
            className="text-[#1976D2] text-sm font-semibold cursor-pointer"
            onClick={() => setInputDisabled(!inputDisabled)}
          >
            {inputDisabled ? "Edit" : "Cancel"}
          </p>
        </div>

        <TextField
          disabled={inputDisabled}
          label="Your Name"
          variant="outlined"
          size="small"
          fullWidth
          name="fullName"
          value={input.fullName}
          onChange={handleChange}
          required
        />
        <TextField
          disabled={inputDisabled}
          label="Email Address"
          variant="outlined"
          size="small"
          fullWidth
          name="email"
          value={input.email}
          onChange={handleChange}
          required
        />

        <TextField
          disabled={inputDisabled}
          label="Mobile Number"
          variant="outlined"
          size="small"
          fullWidth
          type="tel"
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={handleChange}
          required
        />

        {!inputDisabled && (
          <Button type="submit" variant="contained" size="large">
            SAVE
          </Button>
        )}
      </form>
    </div>
  );
};

export default AccountInformation;
