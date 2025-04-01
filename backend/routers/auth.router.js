const express = require("express");
const {
  register,
  login,
  profile,
  addressCreate,
  getAddress,
  deleteAddress,
  OTPVerifyController,
  profileUpdate,
  logOut,
} = require("../controllers/auth.controller");
const tokenVerify = require("../middleware/auth.middleware");
// const registerValidate = require("../middleware/joi.middleware");
const validation = require("../middleware/joi.middleware");
const {
  registerSchema,
  loginSchema,
  addressSchema,
} = require("../utils/joi.auth.schema");
const OTP = require("../models/otp.model");

const router = express.Router();

router.route("/otp").post(validation(registerSchema), OTPVerifyController);

router.route("/register").post(validation(registerSchema), register);

router.route("/login").post(validation(loginSchema), login);
router.route("/logout").get(logOut);

router.route("/profile").get(tokenVerify, profile);
router.route("/profile-update").put(tokenVerify, profileUpdate);

router.route("/address").post(tokenVerify, addressCreate);

router.route("/address").get(tokenVerify, getAddress);

router.route("/delete-address/:addressId").delete(tokenVerify, deleteAddress);

module.exports = router;
