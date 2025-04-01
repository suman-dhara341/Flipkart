import React, { useState } from "react";
import CartLeft from "./CartLeft";
import CartRight from "./CartRight";
import CartPageAddress from "./CartPageAddress";
import { useDispatch, useSelector } from "react-redux";
import { getCartItem } from "../../actions/api.call";
import { setCartItems } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [nextPage, setNextPage] = useState(1);
  const item = useSelector((state) => state?.cart?.cartItems);

  const cartItemsAddressId = useSelector(
    (state) => state?.cart?.cartItemsAddressId
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allCartItem = async () => {
    const res = await getCartItem();

    if (res?.data?.success) {
      dispatch(setCartItems(res?.data?.getProduct));
    } else {
      toast.error(
        res.response?.data?.message || "Something was wrong. Try again."
      );
    }
  };

  const addPage = () => {
    if (cartItemsAddressId) {
      setNextPage(3);
    } else {
      toast.error("Add you address");
    }
  };

  const Checkout = () => {
    navigate("/payment");
  };
  return (
    <>
      {item?.length > 0 ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mx-4 my-4 relative bg-[#EFF0F2]">
          {nextPage === 1 ? (
            <div className="col-span-2">
              <CartLeft item={item} allCartItem={allCartItem} />
              <div className="bg-white sticky bottom-0 p-4 border flex justify-end">
                <button
                  onClick={() => setNextPage(2)}
                  className="bg-[#FB641B] py-4 px-9 rounded-md"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {nextPage === 2 ? (
            <div className="col-span-2 bg-white">
              <CartPageAddress />
              <div className="flex items-center justify-between p-2 border">
                <button
                  onClick={() => setNextPage(1)}
                  className="bg-[#FB641B] py-4 px-9 rounded-md"
                >
                  Back
                </button>
                <button
                  onClick={addPage}
                  className="bg-[#FB641B] py-4 px-9 rounded-md"
                >
                  Delivery Here
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {nextPage === 3 ? (
            <div className=" md:col-span-3 bg-[#EFF0F2] flex items-center justify-center flex-col">
              <CartRight item={item} />
              <div className="flex items-center justify-between p-2 border gap-4">
                <button
                  onClick={() => setNextPage(2)}
                  className="bg-[#FB641B] py-4 px-9 rounded-md"
                >
                  Back
                </button>
                {/* <button
                  onClick={Checkout}
                  className="bg-[#FB641B] py-4 px-9 rounded-md"
                >
                  Payment Now
                </button> */}
                <Payment
                  userId="67b348a7df26194ee0225639"
                  amount={item.totalAmount}
                  address={"fnkfsnf"}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          {nextPage === 1 || nextPage === 2 ? (
            <div>
              <div className="sticky top-0">
                <CartRight item={item} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center">
          No item found in your cart
        </div>
      )}
    </>
  );
};

export default Cart;
