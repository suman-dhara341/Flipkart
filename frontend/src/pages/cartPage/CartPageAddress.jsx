import React, { useEffect, useState } from "react";
import { addAddress, getAddress } from "../../actions/api.call";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemsAddress } from "../../redux/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
];

const CartPageAddress = () => {
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState();
  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState(false);
  const [input, setInput] = useState({});

  useEffect(() => {
    dispatch(setCartItemsAddress(addressId));
  }, [addressId]);

  const getUserAddress = async () => {
    const res = await getAddress();
    if (res.data.success) {
      setAddress(res?.data?.address);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addAddress(input);
    if (res?.data?.success) {
      toast.success(res.data.message);
      getUserAddress();
      setNewAddress(false);
    } else {
      toast.error(res.response?.data?.message || "Login failed. Try again.");
    }
  };

  useEffect(() => {
    getUserAddress();
  }, []);
  return (
    <>
      <div className="bg-[#2874F0]">
        <p className="text-white p-4">DELIVERY ADDRESS</p>
      </div>
      <div
        className={
          newAddress
            ? "hidden"
            : "flex items-center gap-2 text-[#2874F0] mt-2 border-2 p-3"
        }
        onClick={() => setNewAddress(true)}
      >
        <AddIcon />
        <p className="font-semibold">Add a new address</p>
      </div>
      {newAddress ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-4">
            <TextField
              size="small"
              sx={{ width: "50%" }}
              label="Name"
              variant="outlined"
              name="fullName"
              value={input.fullName}
              onChange={handleChange}
              required
            />
            <TextField
              sx={{ width: "50%" }}
              label="10-digit mobile number"
              variant="outlined"
              size="small"
              type="number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <TextField
              size="small"
              sx={{ width: "50%" }}
              label="Pincode"
              type="number"
              variant="outlined"
              name="pinCode"
              value={input.pinCode}
              onChange={handleChange}
              required
            />
            <TextField
              sx={{ width: "50%" }}
              label="Locality"
              variant="outlined"
              size="small"
              name="locality"
              value={input.locality}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            placeholder="Enter Your area"
            rows={4}
            className="border-2 w-full"
            name="area"
            value={input.area}
            onChange={handleChange}
          />
          <div className="flex items-center gap-4">
            <TextField
              size="small"
              sx={{ width: "50%" }}
              label="City"
              variant="outlined"
              name="city"
              value={input.city}
              onChange={handleChange}
              required
            />
            <FormControl
              size="small"
              fullWidth
              sx={{ width: "50%" }}
              error={!input.state}
            >
              <InputLabel>State</InputLabel>
              <Select name="state" value={input.state} onChange={handleChange}>
                {states.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center gap-4">
            <TextField
              size="small"
              sx={{ width: "50%" }}
              label="Landmark"
              variant="outlined"
              name="landmark"
              value={input.landmark}
              onChange={handleChange}
            />
            <TextField
              sx={{ width: "50%" }}
              label="Alternate Phone Number"
              variant="outlined"
              size="small"
              name="alternatePhNumber"
              value={input.alternatePhNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4">
            <p className="font-medium">Address Type</p>
            <div className="space-x-2">
              <input
                className="cursor-pointer"
                type="radio"
                id="Home"
                name="addressType"
                value="Home"
                checked={input.addressType === "Home"}
                onChange={handleChange}
                required
              />
              <label className="cursor-pointer" htmlFor="Home">
                Home
              </label>
            </div>
            <div className="space-x-2 cursor-pointer">
              <input
                className="cursor-pointer"
                type="radio"
                id="Work"
                name="addressType"
                checked={input.addressType === "Work"}
                value="Work"
                onChange={handleChange}
                required
              />
              <label className="cursor-pointer" htmlFor="Work">
                Work
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button variant="outlined" onClick={() => setNewAddress(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        ""
      )}

      {address.length > 0 ? (
        address?.map((item, index) => (
          <div key={index} className="flex pl-4  border p-4 gap-4">
            <input
              type="radio"
              id={item?._id}
              name="address"
              checked={addressId === item._id}
              value={addressId}
              onChange={() => setAddressId(item._id)}
            />
            <label htmlFor={item?._id}>
              <div className="flex items-center justify-between  mt-4">
                <div className=" flex flex-col gap-4">
                  <span className="px-2 py-1 rounded-md text-sm font-medium bg-[#F0F0F0] w-fit">
                    {item.addressType}
                  </span>
                  <div className="flex gap-2 text-sm font-semibold">
                    <p>{item.fullName}</p>
                    <p>{item.phoneNumber}</p>
                    <p>{item?.alternatePhNumber}</p>
                  </div>
                  <p className="text-sm">
                    {item.locality}
                    {item?.landmark},{item?.area}, {item?.city}
                    {item?.state} {item?.pinCode}
                  </p>
                </div>
                {/* <DeleteIcon onClick={() => deleteAddressHandler(item._id)} /> */}
              </div>
            </label>
          </div>
        ))
      ) : (
        <div>No address found</div>
      )}
    </>
  );
};

export default CartPageAddress;
