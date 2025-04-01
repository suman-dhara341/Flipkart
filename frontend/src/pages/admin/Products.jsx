import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Tables from "./Tables";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const tableHead = [
  { label: "Photo" },
  { label: "Name" },
  { label: "Price" },
  { label: "Brand" },
  { label: "Stock" },
  { label: "Edit" },
];

const Products = () => {
  const [query, setQuery] = useState("");
  const tableRows = useSelector((state) => state?.admin?.products) || [];

  const search = (data) => {
    if (!query) return data;
    return data.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="mt-16 flex flex-col items-center">
      <div className="bg-white p-2 rounded-2xl xl:w-[34rem] h-10 flex gap-2">
        <SearchIcon />
        <input
          type="text"
          className="h-full w-full outline-none bg-white"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="w-full">
        <Tables tableHead={tableHead} tableRows={search(tableRows)} />
      </div>

      {search(tableRows).map((dataObj, index) => (
        <div key={index}>{/* <h1>{dataObj.name}</h1> */}</div>
      ))}
    </div>
  );
};

export default Products;
