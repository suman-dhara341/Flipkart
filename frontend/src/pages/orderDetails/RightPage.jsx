import React from "react";

const RightPage = ({ data, address, amount }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white p-4 rounded-md">
        <p>Invoice download</p>
      </div>
      <div className="bg-white">
        <p className="font-semibold text-sm border-b px-4 py-3">
          Shipping Details
        </p>
        <div className="p-4 space-y-2">
          <p className="font-semibold">{address?.fullName}</p>
          <p className="text-sm">
            {address?.locality} {address?.landmark} {address?.city}
            {address?.pinCode} {address?.state}
          </p>
          <div className="flex flex-col">
            <p className="font-semibold text-sm">Phone number: </p>
            <p className="text-sm">
              {address?.phoneNumber},{address?.alternatePhNumber}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <p className="font-semibold text-sm p-4 border-b">Price Details</p>
        <div className="p-4">
          <div className="flex justify-between text-sm">
            <p>List price</p>
            <p>₹{data?.productId?.price}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Selling price</p>
            <p>₹{amount}</p>
          </div>
          {/* <div className="flex justify-between text-sm">
            <p>Extra Discount</p>
            <p>₹199</p>
          </div> */}
          <div className="flex justify-between text-sm">
            <p>Total Quantity</p>
            <p>{data?.quantity}</p>
          </div>
        </div>
        <div className="flex justify-between text-sm p-4 border-y">
          <p>Total Amount</p>
          <p>₹{data?.price * data?.quantity}</p>
        </div>
        {/* <div>
          <p className="text-sm p-4">Credit Card, Flipkart Wallet: ₹399.0</p>
        </div> */}
      </div>
    </div>
  );
};

export default RightPage;
