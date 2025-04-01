import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addOneProductImg,
  deleteAdminProductImg,
  productDataUpdate,
} from "../../actions/api.call";
import toast from "react-hot-toast";
import { setProductsUpdate } from "../../redux/adminSlice";
import { Button, TextField } from "@mui/material";

const ProductView = () => {
  const { id } = useParams();
  const products = useSelector((state) => state?.admin?.products) || [];
  const product = products?.filter((item) => item._id === id)[0];

  const [img, setImg] = useState([]);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: product?.name || "",
    description: "" || product?.description,
    price: "" || product?.price,
    discount: "" || product?.discount,
    finalPrice: "" || product?.finalPrice,
    category: "" || product?.category,
    brand: "" || product?.brand,
    stock: "" || product?.stock,
  });

  const deleteImg = async (imgId) => {
    if (window.confirm("Are you sure you want to delete this image")) {
      const { data } = await deleteAdminProductImg({ productId: id, imgId });
      if (data?.success) {
        toast.success(data.message);
        dispatch(setProductsUpdate());
      }
    }
  };

  const onChangeImg = (e) => {
    setImg(e.target.files[0]);
  };

  const handleImg = async () => {
    if (img.length === 0) {
      toast.error("Please select an image first!");
      return;
    }
    const formData = new FormData();
    formData.append("img", img);
    formData.append("productId", id);
    const { data } = await addOneProductImg(formData);
    if (data.success) {
      toast.success(data.message);
      dispatch(setProductsUpdate());
      setImg([]);
    }
  };

  const onChangeHandler = (e) => {
    let { name, value } = e.target;

    setInput((pre) => ({ ...pre, [name]: value }));

    if (name === "price" || name === "discount") {
      const price = parseFloat(name === "price" ? value : input.price);
      const discount = parseFloat(name === "discount" ? value : input.discount);

      const discountPrice = price - (price * discount) / 100;

      setInput((pre) => ({
        ...pre,
        ["finalPrice"]: discountPrice,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await productDataUpdate({ productId: id, payload: input });
    if (data?.success) {
      toast.success(data?.message);
      dispatch(setProductsUpdate());
    }
  };

  useEffect(() => {
    dispatch(setProductsUpdate());
  }, [2]);

  return (
    <div className="mt-16 flex flex-col items-center w-full">
      <div className="flex flex-wrap gap-4 border-2 p-2">
        {product?.images.map((item) => (
          <div className="relative">
            <img className="h-48 w-44 border-2" src={item?.url} alt="" />
            <DeleteIcon
              onClick={() => deleteImg(item?._id)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div>
        <p className="text-blue-600">Add More Image</p>
        <input type="file" accept="image/*" onChange={onChangeImg} />
        <Button variant="contained" onClick={handleImg}>
          Submit
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 bg-white py-4 px-10 rounded-lg w-96 mt-2">
          <TextField
            label="Product Name"
            variant="outlined"
            name="name"
            onChange={onChangeHandler}
            value={input.name}
            required
          />
          <textarea
            placeholder="Description"
            className="border-2"
            name="description"
            onChange={onChangeHandler}
            value={input.description}
            required
          />
          <TextField
            label="Price"
            variant="outlined"
            name="price"
            type="number"
            onChange={onChangeHandler}
            value={input.price}
            required
          />
          <TextField
            label="Discount"
            variant="outlined"
            name="discount"
            type="number"
            onChange={onChangeHandler}
            value={input.discount}
            required
          />
          <TextField
            label="FinalPrice"
            variant="outlined"
            disabled
            value={input.finalPrice}
            required
          />
          <TextField
            label="Category"
            variant="outlined"
            name="category"
            onChange={onChangeHandler}
            value={input.category}
            required
          />
          <TextField
            label="Brand"
            variant="outlined"
            name="brand"
            onChange={onChangeHandler}
            value={input.brand}
            required
          />
          <TextField
            label="Stock"
            variant="outlined"
            name="stock"
            type="number"
            onChange={onChangeHandler}
            value={input.stock}
            required
          />
          <Button type="submit" variant="contained">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductView;
