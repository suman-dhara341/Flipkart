import { Avatar } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";

const LeftComponent = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/logout");
  };
  return (
    <>
      <div className="bg-[#FFFFFF] flex items-center gap-4 px-4 py-2 rounded-md">
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <div>
          <p className="text-sm">Hello,</p>
          <p className="font-semibold">Suman</p>
        </div>
      </div>
      <div className="bg-white mt-4 rounded-md flex flex-col gap-4 p-4">
        <NavLink
          to={"/orders"}
          className="flex items-center justify-between border-b px-4 py-2"
        >
          <p>My Order</p>
          <ChevronRightIcon />
        </NavLink>
        <div className="flex items-center gap-4 px-4 font-semibold text-gray-700">
          <PersonIcon />
          <p>ACCOUNT SETTINGS</p>
        </div>
        <div className="flex flex-col gap-4 items-center text-sm font-semibold">
          <NavLink to={"/account"}>Personal Information</NavLink>
          <NavLink to={"/account/addresses"}>Manage Addresses</NavLink>
          <NavLink to={"/account/wishlist"}>My Wishlist</NavLink>
        </div>
        <div
          className="flex items-center justify-between border-t px-4 py-2 cursor-pointer"
          onClick={logout}
        >
          <p className="font-semibold">Logout</p>
          <LogoutIcon />
        </div>
      </div>
    </>
  );
};

export default LeftComponent;
