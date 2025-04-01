import React, { useEffect, useState } from "react";
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import { getOrders } from "../../actions/api.call";

const OrderPage = () => {
  const [orders, setOrders] = useState();
  const allData = async () => {
    const res = await getOrders();
    if (res?.data?.success) {
      setOrders(res.data.findOrder);
    }
  };

  useEffect(() => {
    allData();
  }, []);
  return (
    <div className="grid md:grid-cols-5 py-4 px-6 gap-4 bg-[#F1F3F6]">
      <div className="md:col-span-1 ">
        <LeftPage />
      </div>
      <div className="md:col-span-4">
        <RightPage orders={orders?.products} />
      </div>
    </div>
  );
};

export default OrderPage;
