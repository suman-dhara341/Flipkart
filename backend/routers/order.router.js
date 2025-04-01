const express = require("express");
const {
  getCartItem,
  createCartItem,
  oneCartItemDelete,
} = require("../controllers/cartpage.controller");
const tokenVerify = require("../middleware/auth.middleware");

const Router = express.Router();

Router.route("/get-cart-item").get(tokenVerify, getCartItem);
Router.route("/create-cart-item/:productId").post(tokenVerify, createCartItem);
Router.route("/create-cart-item/:productId").delete(
  tokenVerify,
  oneCartItemDelete
);

module.exports = Router;
