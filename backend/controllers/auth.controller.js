const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Address = require("../models/address.model");
const OTPSend = require("../services/mail.service");
const OTPModel = require("../models/otp.model");

const OTPVerifyController = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password } = req.body;

    if (!fullName || !phoneNumber || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const otpEmail = await OTPModel.findOne({ email });
    if (otpEmail) {
      return res
        .status(400)
        .json({ message: "Try after sometime later", success: false });
    }

    const isPhoneNumber = await authModel.findOne({ phoneNumber });

    if (isPhoneNumber) {
      return res
        .status(400)
        .json({ message: "Phone Number already exits", success: false });
    }

    const isEmail = await authModel.findOne({ email });

    if (isEmail) {
      return res
        .status(400)
        .json({ message: "Email ID already exits", success: false });
    }

    const OTP = Math.floor(Math.random() * 9000 + 1000);
    await OTPSend(email, OTP);

    const data = {
      email: email,
      otp: OTP,
      otpExpiry: new Date(Date.now() + 60 * 5 * 1000),
    };
    await OTPModel.create(data);

    return res
      .status(200)
      .json({ message: "OTP send successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { fullName, phoneNumber, email, password, isAdmin, otp } = req.body;

    const getOTP = await OTPModel.findOne({ email });

    if (!getOTP) {
      return res
        .status(400)
        .json({ message: "Wrong OTP or OTP has expired", success: false });
    }

    if (Number(otp) !== Number(getOTP.otp)) {
      return res
        .status(400)
        .json({ message: "Wrong OTP or OTP has expired", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const userData = {
      fullName,
      phoneNumber,
      email,
      password: hashPassword,
      isAdmin: isAdmin || false,
    };

    await authModel.create(userData);

    return res
      .status(200)
      .json({ message: "Account created successfully", success: true });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const userFind = await authModel.findOne({ email });

    if (!userFind) {
      return res
        .status(401)
        .json({ message: "Wrong credentials", success: false });
    }

    const passwordValid = await bcrypt.compare(password, userFind.password);

    if (!passwordValid) {
      return res
        .status(400)
        .json({ message: "Wrong credentials", success: false });
    }

    const token = await jwt.sign(
      { id: userFind._id, isAdmin: userFind.isAdmin },
      process.env.JWT_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res
      .cookie("Token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .status(200)
      .json({
        message: `Welcome to ${userFind.fullName}`,
        isUser: userFind,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

const logOut = async (req, res) => {
  try {
    return res
      .cookie("Token", "", { maxAge: 0 })
      .json({ message: "Logout out successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const profile = async (req, res) => {
  try {
    const { id } = req.id;
    const isUser = await authModel.findById({ _id: id }).select("-password");
    if (!isUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({ isUser, success: true });
  } catch (error) {
    console.log(error);
  }
};

const profileUpdate = async (req, res) => {
  try {
    const { fullName, email, phoneNumber } = req.body;

    const { id } = req.id;
    if (!id) {
      return res
        .state(400)
        .json({ message: "Something was wrong", success: false });
    }
    const user = await authModel.findOneAndUpdate({
      _id: id,
      $set: { fullName, email, phoneNumber },
    });

    if (!user) {
      return res.state(400).json({ message: "User not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "User Updated successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const addressCreate = async (req, res) => {
  try {
    const { id } = req.id;
    const {
      fullName,
      locality,
      pinCode,
      area,
      city,
      state,
      landmark,
      phoneNumber,
      addressType,
      alternatePhNumber,
    } = req.body;
    if (
      !fullName ||
      !locality ||
      !pinCode ||
      !city ||
      !state ||
      !phoneNumber ||
      !addressType
    ) {
      return res
        .state(200)
        .json({ message: "All fields are requires", success: false });
    }

    const isAddress = await Address.create({
      fullName,
      locality,
      pinCode,
      area,
      city,
      state,
      landmark,
      phoneNumber,
      addressType,
      alternatePhNumber,
      userId: id,
    });

    if (!isAddress) {
      return res
        .state(400)
        .json({ message: "Address store failed", success: false });
    }

    return res
      .status(200)
      .json({ message: "Address create successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const getAddress = async (req, res) => {
  try {
    const { id } = req.id;

    const address = await Address.find({ userId: id });
    return res.status(200).json({ address, success: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { id } = req.id;

    if (!addressId) {
      return res
        .status(404)
        .json({ message: "Address not found", success: false });
    }

    const isAddress = await Address.deleteOne({
      $and: [{ _id: addressId }, { userId: id }],
    });
    if (isAddress.deletedCount === 0) {
      return res
        .status(400)
        .json({ message: "Address not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Address deleted successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  logOut,
  profile,
  profileUpdate,
  addressCreate,
  getAddress,
  deleteAddress,
  OTPVerifyController,
};
