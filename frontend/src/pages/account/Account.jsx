import React from "react";
import LeftComponent from "./LeftComponent";
import { Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div className="grid grid-cols-4 gap-4 px-8  py-3 bg-[#F1F3F6]">
      <div className="hidden md:col-span-1 md:block">
        <LeftComponent />
      </div>
      <div className="col-span-4 md:col-span-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
