const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: String,
  otpExpiry: { type: Date, expires: 30 },
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
