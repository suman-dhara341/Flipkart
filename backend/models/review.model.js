const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: [
      {
        rating1: {
          type: Number,
          required: true,
        },
        rating2: {
          type: Number,
          required: true,
        },
        rating3: {
          type: Number,
          required: true,
        },
        rating4: {
          type: Number,
          required: true,
        },
        rating5: {
          type: Number,
          required: true,
        },
      },
    ],
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const review = mongoose.model("Review", reviewSchema);

module.exports = review;
