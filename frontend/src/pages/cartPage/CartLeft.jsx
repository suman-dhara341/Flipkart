import React from "react";
import { createCart, oneCartDelete } from "../../actions/api.call";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CartLeft = ({ item, allCartItem }) => {
  const navigate = useNavigate();
  const orderIncrease = async (id) => {
    const res = await createCart(id);
    if (res?.data?.success) {
      toast.success(res.data.message);
      allCartItem();
    } else {
      toast.error(
        res.response?.data?.message || "Something was wrong. Try again."
      );
    }
  };

  const orderDecrease = async (id) => {
    const res = await oneCartDelete(id);

    if (res?.data?.success) {
      toast.success(res.data.message);
      allCartItem();
    } else {
      toast.error(
        res.response?.data?.message || "Something was wrong. Try again."
      );
    }
  };

  const viewProduct = (id) => {
    navigate(`/product_details/${id}`);
  };
  return (
    <div>
      {item?.map((item, index) => (
        <div key={index} className=" bg-white flex py-3 px-4 border-b">
          <div className="py-4 flex flex-col items-center cursor-pointer">
            <img
              src={item?.productId?.images[0]?.url}
              alt={item?.productId?.images[0]?.url}
              onClick={() => viewProduct(item?.productId?._id)}
              className="h-40 w-40"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => orderDecrease(item.productId._id)}
                  className="rounded-full border-2 p-2 w-8 h-8 flex items-center justify-center"
                >
                  -
                </button>

                <input
                  type="text"
                  value={item?.quantity}
                  className="w-16 border-2"
                />
                <button
                  onClick={() => orderIncrease(item.productId._id)}
                  className="rounded-full border-2 p-2 w-8 h-8 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="mt-5 space-x-6 flex text-sm sm:hidden">
                <button className="hover:text-[#2874F0] font-semibold ">
                  SAVE FOR LATER
                </button>
                <button className="hover:text-[#2874F0] font-semibold">
                  REMOVE
                </button>
              </div>
            </div>
          </div>
          <div className="ml-8 mt-4">
            <div
              onClick={() => viewProduct(item?.productId?._id)}
              className="cursor-pointer"
            >
              <p className="line-clamp-1 xl:w-96 font-medium">
                {item?.productId?.name}
              </p>

              <p className="mt-4 space-x-2">
                <span className="font-semibold">
                  ₹{item?.productId?.finalPrice}
                </span>
                <span className="line-through text-gray-600">
                  ₹{item?.productId?.price}
                </span>
                <span className="text-[#3A8F3E] font-bold">
                  {item?.productId?.discount}% Off
                </span>
              </p>
            </div>
            {/* <p className="text-gray-600 mt-2">Size: L</p> */}
            {/* <p className="text-gray-600 text-sm mt-2">
              Seller: {item?.productId?.brand}
            </p> */}
            <div className="mt-5 space-x-6 hidden sm:block">
              <button className="hover:text-[#2874F0] font-semibold">
                SAVE FOR LATER
              </button>
              <button className="hover:text-[#2874F0] font-semibold">
                REMOVE
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm mt-4 ml-6">
              Delivery by Tue Jan 28 | <span>Free</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartLeft;
