const express = require("express");
const tokenVerify = require("../middleware/auth.middleware");
const {
  createWishlist,
  getWishlist,
} = require("../controllers/wishlist.controller");

const Router = express.Router();

Router.route("/wishlist/:productId").post(tokenVerify, createWishlist);
Router.route("/wishlist/").get(tokenVerify, getWishlist);

module.exports = Router;
