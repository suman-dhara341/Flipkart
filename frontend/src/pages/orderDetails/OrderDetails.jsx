import React, { useEffect, useState } from "react";
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import { useParams } from "react-router-dom";
import { getOrdersDetails, orderCancel } from "../../actions/api.call";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const [data, setData] = useState();
  const [address, setAddress] = useState();
  const [amountStatus, setAmountStatus] = useState();
  const [amount, setAmount] = useState();
  const { orderId, productId } = useParams();
  const getItem = async () => {
    const res = await getOrdersDetails({ orderId, productId });

    if (res.data.success) {
      setData(res.data.orderDetails[0]);
      setAddress(res.data.orderDetails[0].address);
      setAmountStatus(res.data.orderDetails[0].amountStatus);
      setAmount(res.data.orderDetails[0].price);
    }
  };

  const orderCancelController = async () => {
    const res = await orderCancel({ orderId, productId });
    if (res.data.success) {
      toast.success(res.data.message);
      getItem();
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="py-6 px-20 grid grid-cols-4 gap-4 bg-[#F1F3F6]">
      <div className="col-span-3 bg-white rounded-md">
        <LeftPage
          data={data}
          amountStatus={amountStatus}
          orderCancelController={orderCancelController}
        />
      </div>
      <div className="col-span-1">
        <RightPage address={address} data={data} amount={amount} />
      </div>
    </div>
  );
};

export default OrderDetails;
