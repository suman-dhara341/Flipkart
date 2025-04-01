import React from "react";
import { createOrder, verifyOrder } from "../../actions/api.call";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCartItems } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Payment({ userId, amount, address }) {
  const item = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const { data } = await createOrder({ amount: item?.totalAmount });

      // Step 2: Open Razorpay checkout
      const options = {
        key: "rzp_test_uvvuyUp2fZOaLA",
        amount: data.order.amount,
        currency: "INR",
        name: "E-Shop",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          const paymentResult = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            address: item?.cartItemsAddressId,
            amount: item?.totalAmount,
            products: item?.cartItems.map((cartItem) => ({
              productId: cartItem.productId._id,
              quantity: cartItem.quantity,
              price: cartItem.productId.finalPrice,
            })),
          };

          const verify = await verifyOrder(paymentResult);

          if (verify.data.success) {
            toast.success("Payment successful!");
            dispatch(setCartItems([]));
            navigate("/orders");
          } else {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment: ", error);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        className="bg-[#FB641B] py-4 px-9 rounded-md"
      >
        Pay ₹{item?.totalAmount}
      </button>
    </div>
  );
}

export default Payment;
