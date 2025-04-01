const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  userId: String, //
  amount: Number,
  currency: String, //
  status: String, //
  orderId: String, //
  paymentId: String, //
  address: String, //
});
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
