import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { createCart, oneProductGet } from "../../actions/api.call";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCartItemChange } from "../../redux/cartSlice";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [img, setImg] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const oneProduct = async () => {
    const res = await oneProductGet(id);
    setProduct(res);
  };
  useEffect(() => {
    oneProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const addToCart = async (direction) => {
    const userId = localStorage.getItem("Id");
    if (userId) {
      const res = await createCart(id);
      if (res?.data?.success) {
        toast.success(res.data.message);
        dispatch(setCartItemChange());

        if (direction === "buy") {
          navigate("/viewcart");
        }
      } else {
        toast.error(
          res.response?.data?.message || "Something was wrong. Try again."
        );
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="md:grid md:grid-cols-3 p-4 gap-4 space-y-4 bg-white">
        <div className="md:col-span-1 flex w-full">
          <div className="flex flex-col ">
            {product?.data?.images?.map((item, index) => (
              <div
                key={index}
                className="h-16 w-16 md:w-20 py-1 px-3 border-t-2 border-l-2"
                onClick={() => setImg(index)}
              >
                <img
                  src={product?.data?.images[index]?.url}
                  alt={product?.data?.images[index]?.url}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="w-full">
            <div className="border-2 py-4 px-8 h-[27rem] w-full">
              <img
                src={product?.data?.images[img]?.url}
                alt={product?.data?.images[img]?.url}
                className="h-full w-full"
              />
            </div>
            <div className="flex items-center justify-between gap-4 mt-2 w-full">
              <Button
                sx={{ background: "#FF9F00", height: "3rem", width: "50%" }}
                variant="contained"
                onClick={addToCart}
              >
                ADD TO CART
              </Button>
              <Button
                sx={{ background: "#FB641B", height: "3rem", width: "50%" }}
                variant="contained"
                onClick={() => addToCart("buy")}
              >
                BUY NOW
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <p className="font-semibold text-lg text-gray-600">
            {product?.data?.brand}
          </p>
          <p className="font-medium text-lg">{product?.data?.name}</p>
          <p className="text-[#26A541]">Special price</p>
          <p className="flex items-center gap-4">
            <span className="text-xl font-semibold">
              ₹{product?.data?.finalPrice}
            </span>
            <span className="line-through text-gray-600">
              {product?.data?.price}
            </span>
            <span className="text-[#26A541] font-semibold">
              {product?.data?.discount}% off
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span className="bg-[#26A541] px-2 py-1 text-lg font-medium text-white rounded-lg">
              3.8*
            </span>
            <span className="text-gray-600 font-medium">
              4,743 ratings and {product?.data?.numOfReviews} reviews
            </span>
          </p>
          <div className="flex flex-col gap-2">
            {/* <div className="flex items-center gap-2">
              <p className="text-gray-800 font-medium">Delivery</p>
              <div className="flex items-center">
                <TextField
                  label="Enter Delivery Pincode"
                  variant="standard"
                  size="small"
                />
                <p className="bg-[#26A541] px-2 py-1 rounded-md text-white">
                  Change
                </p>
              </div>
            </div> */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <p>Delivery in 2 Days, Friday</p>
              <p>
                <span className="text-[#26A541]">Free</span>
                <span className="line-through ml-1">₹40</span>
              </p>
            </div>
          </div>
          <div>
            <Accordion
              sx={{
                border: "none",
                boxShadow: "none",
                width: "100%",
                marginTop: "9px",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="font-semibold text-2xl">Product Details</div>
              </AccordionSummary>
              <AccordionDetails>
                <div>{product?.data?.description}</div>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="border-b-2 flex items-center gap-4">
            <p className="text-xl font-semibold">Ratings & Reviews</p>
            <span className="bg-[#26A541] px-2 py-1 rounded-lg text-xl text-white">
              3.9
            </span>
            <p className="text-gray-700">601 ratings and 33 reviews</p>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
