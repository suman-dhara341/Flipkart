const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  productId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = wishlist;
