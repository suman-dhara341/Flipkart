const crypto = require("crypto");
const razorpay = require("../services/razorpay");
const Order = require("../models/order.model");
const Cart = require("../models/cartPage.module");
const Product = require("../models/product.model");
// const Order = require("../models/orders.schema");

// user

//Creating Order
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.id.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Something was wrong", success: false });
    }

    const options = {
      amount: amount * 100, // Razorpay requires amount in paise
      currency: "INR",
      receipt: `payment_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verifying the payment
const verifyOrder = async (req, res) => {
  try {
    const {
      order_id,
      payment_id,
      razorpay_signature,
      address,
      products,
      amount,
    } = req.body;

    const userId = req.id.id;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      let findUser = await Order.findOne({ userId });

      if (!findUser) {
        findUser = await Order.create({ userId });
        if (!findUser) {
          return res
            .status(400)
            .json({ message: "Something was wrong", success: false });
        }
      }

      await Promise.all(
        products.map(async (item) => {
          const product = await Product.findById(item?.productId);
          if (!product) {
            throw new Error(`Product with ID ${item?.productId} not found`);
          }
          if (product.stock >= item.quantity) {
            product.stock -= item.quantity;
            await product.save();
          } else {
            throw new Error(`Insufficient stock for product ${product.name}`);
          }
        })
      );

      await Promise.all(
        products.map(async (item) => {
          findUser.products.unshift({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            address,
            amountStatus: "paid",
            paymentId: payment_id,
            orderId: order_id,
            amount,
          });
        })
      );

      await findUser.save();

      await Cart.deleteOne({ userId });

      res.json({
        success: true,
        message: "Payment verified successfully!",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const userId = req.id.id;

    const findOrder = await Order.findOne({ userId }).populate(
      "products.productId"
    );

    if (findOrder) {
      return res.status(200).json({ findOrder, success: true });
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
  }
};

const OrderDetails = async (req, res) => {
  const { orderId, productId } = req.params;

  if (!req.id.id) {
    return res.status(400).json({ message: "User not login" });
  }
  if (!orderId || !productId) {
    return res.status(400).json({ message: "Order not found", success: false });
  }
  const findProduct = await Order.findOne({
    userId: req.id.id,
  })
    .populate("products.productId")
    .populate("products.address");

  if (!findProduct) {
    return res.status(400).json({ message: "Order not found", success: false });
  }

  const orderDetails = findProduct.products.filter((item) => {
    return (
      item._id.toString() === productId && item.orderId.toString() === orderId
    );
  });

  return res.send({
    orderDetails,
    success: true,
  });
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId, productId } = req.params;

    if (!req.id.id) {
      return res.status(400).json({ message: "User not login" });
    }
    if (!orderId || !productId) {
      return res
        .status(400)
        .json({ message: "Order not found", success: false });
    }
    const findProduct = await Order.findOne({
      userId: req.id.id,
    });

    if (!findProduct) {
      return res
        .status(400)
        .json({ message: "Order not found", success: false });
    }

    const index = findProduct.products.findIndex(
      (product) =>
        product._id.toString() === productId &&
        product.orderId.toString() === orderId
    );

    if (index >= 0) {
      findProduct.products[index].status = "Cancelled";
      await findProduct.save();
    } else {
      return res
        .status(400)
        .json({ message: "Something was wrong", success: false });
    }
    return res
      .status(200)
      .json({ message: "Order cancel successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

// admin

const getAdminOrder = async (req, res) => {
  try {
    const { id } = req.id;
    if (!req.id.isAdmin) {
      return res
        .status(500)
        .json({ message: "Unauthorized access", success: false });
    }
    const find = await Order.find({})
      .populate("products.productId")
      .populate("products.address");

    // return res.status(200).json({ find, success: true });

    const adminOrders = find?.flatMap((order) =>
      order.products.filter(
        (item) => item?.productId?.createdBy.toString() === id
      )
    );

    return res.status(200).json({ adminOrders, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const adminStatusUpdate = async (req, res) => {
  try {
    const { orderId, value } = req.query;

    if (!req.id.isAdmin) {
      return res
        .status(500)
        .json({ message: "Unauthorized access", success: false });
    }
    const findOrder = await Order.findOne({
      "products._id": orderId,
    })
      .populate("products.productId")
      .populate("products.address");

    if (!findOrder) {
      return res
        .status(400)
        .json({ message: "Order not found", success: false });
    }

    const index = findOrder.products.findIndex(
      (item) => item._id.toString() === orderId
    );

    if (index === -1) {
      return res
        .status(400)
        .json({ message: "Order Id not found", success: false });
    }

    findOrder.products[index].status = value;
    const updateData = await findOrder.save();
    if (!updateData) {
      return res
        .status(400)
        .json({ message: "Order Id not found", success: false });
    }

    return res.status(200).json({
      message: "Status Update Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
  verifyOrder,
  getOrder,
  OrderDetails,
  cancelOrder,
  getAdminOrder,
  adminStatusUpdate,
};
