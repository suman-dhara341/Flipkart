import { Avatar, Dialog, Menu, MenuItem, Slide } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddProduct from "./AddProduct";
import { deleteAdminProduct } from "../../actions/api.call";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setProductsUpdate } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Tables = ({ tableHead, tableRows }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = useState();
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = ({ event, id }) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    handleClose();
    navigate(`/admin/products/${id}`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    if (window.confirm("You want to delete this product?")) {
      const res = await deleteAdminProduct(id);
      if (res?.data?.success) {
        toast.success(res.data.message);
        dispatch(setProductsUpdate());
        setId(null);
        handleClose();
      } else {
        toast.error(
          res.response?.data?.message || "Something was wrong. Try again."
        );
      }
    }
  };
  return (
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
          {tableRows?.map((item, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4">
                <Avatar src={item?.images[0]?.url} />
              </td>
              <td className="px-6 py-4">{item?.name}</td>
              <td className="px-6 py-4">{item?.finalPrice}</td>
              <td className="px-6 py-4">{item?.brand}</td>
              <td className="px-6 py-4">{item?.stock}</td>
              <td className="px-6 py-4 cursor-pointer">
                <EditIcon
                  onClick={(event) => handleClick({ event, id: item?._id })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClickOpen}>
          <EditIcon />
          <p>Edit</p>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon />
          <p>Delete</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Tables;
