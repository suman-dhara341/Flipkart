const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const carousel = mongoose.model("Carousel", carouselSchema);

module.exports = carousel;
