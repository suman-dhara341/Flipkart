const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
          default: "Pending",
        },
        address: {
          ///
          type: mongoose.Schema.ObjectId,
          ref: "Address",
          required: true,
        },
        amountStatus: {
          type: String,
          enum: ["created", "paid", "failed"],
          default: "Pending",
        },
        paymentId: {
          type: String,
        },
        orderId: {
          type: String,
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
