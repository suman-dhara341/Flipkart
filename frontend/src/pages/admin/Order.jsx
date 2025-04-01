import React, { useEffect, useState } from "react";
import Tables from "./Tables";
import { getAdminOrder, getStatusUpdate } from "../../actions/api.call";
import { Avatar } from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setOrdersUpdate } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";

const tableHead = [
  { label: "Photo" },
  { label: "Name" },
  { label: "Price" },
  { label: "Quantity" },
  { label: "Address" },
  { label: "Edit" },
  { label: "View" },
];

// const tableRows = [
//   {
//     imgUrl: "https://via.placeholder.com/50",
//     name: "Apple iPhone 14",
//     price: 999,
//     brand: "Apple",
//     stock: 5,
//   },
//   {
//     imgUrl: "https://via.placeholder.com/50",
//     name: "Samsung Galaxy S23",
//     price: 899,
//     brand: "Samsung",
//     stock: 7,
//   },
//   {
//     imgUrl: "https://via.placeholder.com/50",
//     name: "Samsung Galaxy S23",
//     price: 899,
//     brand: "Samsung",
//     stock: 7,
//   },
//   {
//     imgUrl: "https://via.placeholder.com/50",
//     name: "Samsung Galaxy S23",
//     price: 899,
//     brand: "Samsung",
//     stock: 7,
//   },
//   {
//     imgUrl: "https://via.placeholder.com/50",
//     name: "Samsung Galaxy S23",
//     price: 899,
//     brand: "Samsung",
//     stock: 7,
//   },
//   {
//     imgUrl: "https://via.placeholder.com/50",
//     name: "Samsung Galaxy S23",
//     price: 899,
//     brand: "Samsung",
//     stock: 7,
//   },
//   {
//     imgUrl: "https://via.placeholder.com/50",
//     name: "Samsung Galaxy S23",
//     price: 899,
//     brand: "Samsung",
//     stock: 7,
//   },
//   {
//     imgUrl: "https://via.placeholder.com/50",
//     name: "Samsung Galaxy S23",
//     price: 899,
//     brand: "Samsung",
//     stock: 7,
//   },
//   {
//     imgUrl: "https://via.placeholder.com/50",
//     name: "Samsung Galaxy S23",
//     price: 899,
//     brand: "Samsung",
//     stock: 7,
//   },
// ];
const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.admin?.orders);

  const handleChange = async (e, orderId) => {
    const { data } = await getStatusUpdate({ orderId, value: e.target.value });

    if (data.success) {
      toast.success(data.message);
      dispatch(setOrdersUpdate());
    } else {
      toast.error(data.message);
    }
  };

  const productView = (id) => {
    navigate(`/product_details/${id}`);
  };

  return (
    <div className="mt-16">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {tableHead?.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {item?.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">
                  <Avatar src={item?.productId?.images[0]?.url} />
                </td>
                <td className="px-6 py-4">{item?.productId?.name}</td>
                <td className="px-6 py-4">{item?.price}</td>
                <td className="px-6 py-4">{item?.quantity}</td>
                <td className="px-6 py-4">
                  <p>{item?.address?.fullName}</p>
                  <p>
                    {item?.address?.landmark},{item?.address?.locality},
                    {item?.address?.city},{item?.address?.area},
                    {item?.address?.pinCode},{item?.address?.state}
                  </p>
                  <p>{item?.address?.phoneNumber}</p>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={item?.status}
                    disabled={item?.status === "Cancelled"}
                    onChange={(e) => handleChange(e, item._id)}
                    className="bg-black text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered" className="text-blue-600">
                      Delivered
                    </option>
                    <option value="Cancelled" className="text-red-700">
                      Cancelled
                    </option>
                  </select>
                </td>
                <td className="px-6 py-4 cursor-pointer">
                  <button onClick={() => productView(item?.productId?._id)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClickOpen}>
            <EditIcon />
            <p>Edit</p>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon />
            <p>Delete</p>
          </MenuItem>
        </Menu> */}
        {/* <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
        >
          <div>
            <AddProduct />
          </div>
        </Dialog> */}
      </div>
      {/* <Tables tableHead={tableHead} tableRows={tableRows} /> */}
    </div>
  );
};

export default Order;
