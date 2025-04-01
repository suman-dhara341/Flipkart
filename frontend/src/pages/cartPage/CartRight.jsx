import React from "react";
import { useDispatch } from "react-redux";
import { setTotalAmount } from "../../redux/cartSlice";

const CartRight = ({ item }) => {
  const dispatch = useDispatch();

  const totalOriginalPrice = item?.length
    ? item.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue?.productId?.price * currentValue?.quantity,
        0
      )
    : 0;
  const totalDiscount = item.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.productId.price - currentValue?.productId?.finalPrice) *
        currentValue?.quantity,
    0
  );
  const totalAmount = totalOriginalPrice - totalDiscount;

  dispatch(setTotalAmount(Math.floor(totalAmount)));

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  return (
    <div className="bg-white">
      <p className="p-4 text-gray-600 font-semibold border-b">PRICE DETAILS</p>
      <div className="border-b">
        <div className="flex items-center justify-between p-4">
          <p>Price ({item?.length} items)</p>
          <p>{formatCurrency(totalOriginalPrice)}</p>
        </div>
        <div className="flex items-center justify-between p-4">
          <p>Discount</p>
          <p className="text-[#388E3C]">− {formatCurrency(totalDiscount)}</p>
        </div>
        <div className="flex items-center justify-between p-4">
          <p>Delivery Charges</p>
          <p className="text-[#388E3C]">
            <span className="line-through">₹80</span> Free
          </p>
        </div>
        {/* <div className="flex items-center justify-between p-4">
          <p>Price (8 items)</p>
          <p>₹10,787</p>
        </div> */}
      </div>
      <div className="flex items-center justify-between p-4 border-b font-bold">
        <p>Total Amount</p>
        <p>{formatCurrency(totalAmount)}</p>
      </div>
      <p className="text-[#388E3C] p-4 font-semibold">
        You will save {formatCurrency(totalDiscount)} on this order
      </p>
    </div>
  );
};

export default CartRight;
