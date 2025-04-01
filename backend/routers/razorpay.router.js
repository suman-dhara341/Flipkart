const express = require("express");
const {
  createOrder,
  verifyOrder,
  getOrder,
  OrderDetails,
  cancelOrder,
  getAdminOrder,
  adminStatusUpdate,
} = require("../controllers/payment.controller");
const tokenVerify = require("../middleware/auth.middleware");
const Router = express.Router();

Router.route("/create-order").post(tokenVerify, createOrder);
Router.route("/verify-payment").post(tokenVerify, verifyOrder);

Router.route("/get-order").get(tokenVerify, getOrder);
Router.route("/get-order/:orderId/:productId").get(tokenVerify, OrderDetails);
Router.route("/cancel-order/:orderId/:productId").get(tokenVerify, cancelOrder);

Router.route("/admin-status-update").get(tokenVerify, adminStatusUpdate);

// admin
Router.route("/get-admin-order").get(tokenVerify, getAdminOrder);

module.exports = Router;
