const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  addressType: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  alternatePhNumber: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
