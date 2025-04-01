import React from "react";
import { useNavigate } from "react-router-dom";

const RightPage = ({ orders }) => {
  const navigate = useNavigate();

  const data = orders?.map((item) => item?.orders) || [];
  const revereData = data.reverse();

  // console.log(revereData);

  const handleNavigate = (productId, orderId) => {
    navigate(`/order_details/${orderId}/${productId}`);
  };

  return (
    <>
      {orders?.map((order) => (
        <div
          key={order?._id}
          className="grid grid-cols-6 gap-4 p-4 bg-white rounded-md m-2 cursor-pointer"
          onClick={() => handleNavigate(order?._id, order?.orderId)}
        >
          <div className="col-span-3 flex items-center gap-2">
            <img
              src={order?.productId?.images?.[0]?.url || "placeholder.jpg"}
              alt={order?.productId?.name || "Product Image"}
              className="h-24 w-20"
            />
            <div>
              <p className="line-clamp-1 text-sm font-semibold">
                {order?.productId?.name}
              </p>
              <p className="text-sm line-clamp-1">
                {order?.productId?.description}
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <p className="text-sm font-semibold">₹{order?.price}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-semibold">Delivered on Oct 27, 2024</p>
            <p className="text-sm">Your item has been delivered</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default RightPage;
