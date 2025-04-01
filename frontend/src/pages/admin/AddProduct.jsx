import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { productCreate } from "../../actions/api.call";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    finalPrice: "",
    category: "",
    brand: "",
    stock: "",
  });

  const [img, setImg] = useState([]);

  const imgHandler = (e) => {
    setImg((prev) => [...prev, e.target.files[0]]);
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

  const handleNextPage = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("price", input.price);
    formData.append("discount", input.discount);
    formData.append("finalPrice", input.finalPrice);
    formData.append("category", input.category);
    formData.append("brand", input.brand);
    formData.append("stock", input.stock);

    if (img.length > 0) {
      for (let i = 0; i < img.length; i++) {
        formData.append("img", img[i]);
      }
    }
    const res = await productCreate(formData);
    if (res?.data?.success) {
      toast.success(res.data.message);
      setInput("");
      setOpen(true);
    } else {
      toast.error(
        res.response?.data?.message || "Something was wrong.Try again."
      );
    }
  };

  return (
    <div className="mt-16 h-screen flex items-center justify-center ">
      {open ? (
        <form onSubmit={handleNextPage}>
          <div className="flex flex-col gap-2 bg-white py-4 px-10 rounded-lg w-96">
            <TextField
              size="small"
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
              size="small"
              label="Price"
              variant="outlined"
              name="price"
              type="number"
              onChange={onChangeHandler}
              value={input.price}
              required
            />
            <TextField
              size="small"
              label="Discount"
              variant="outlined"
              name="discount"
              type="number"
              onChange={onChangeHandler}
              value={input.discount}
              required
            />
            <TextField
              size="small"
              label="FinalPrice"
              variant="outlined"
              disabled
              value={input.finalPrice}
              required
            />
            <TextField
              size="small"
              label="Category"
              variant="outlined"
              name="category"
              onChange={onChangeHandler}
              value={input.category}
              required
            />
            <TextField
              size="small"
              label="Brand"
              variant="outlined"
              name="brand"
              onChange={onChangeHandler}
              value={input.brand}
              required
            />
            <TextField
              size="small"
              label="Stock"
              variant="outlined"
              name="stock"
              type="number"
              onChange={onChangeHandler}
              value={input.stock}
              required
            />
            <Button type="submit" variant="contained">
              Next
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 bg-white py-4 px-10 rounded-lg w-96">
            <input type="file" accept="image/*" onChange={imgHandler} />
            <input type="file" accept="image/*" onChange={imgHandler} />
            <input type="file" accept="image/*" onChange={imgHandler} />
            <input type="file" accept="image/*" onChange={imgHandler} />
            <input type="file" accept="image/*" onChange={imgHandler} />
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outlined"
                onClick={() => setOpen(true)}
                fullWidth
              >
                Back
              </Button>
              <Button variant="contained" type="submit" fullWidth>
                Create
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
