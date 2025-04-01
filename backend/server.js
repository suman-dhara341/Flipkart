require("dotenv").config();
const express = require("express");
const DB = require("./config/db");
const auth = require("./routers/auth.router");
const product = require("./routers/product.router");
const order = require("./routers/order.router");
const cookieParser = require("cookie-parser");
const error = require("./middleware/error.middleware");
const cors = require("cors");
const wishlistRouter = require("./routers/wishlist.router");
const paymentRoute = require("./routers/razorpay.router");
const heroRouter = require("./routers/hero.router");

const app = express();
const PORT = process.env.PORT || 6000;

const corsOptions = {
  origin: [
    "https://flipkart-orcin-iota.vercel.app",
    "https://flipkart-nine-delta.vercel.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// router
app.use("/api/v1/auth", auth);
app.use("/api/v1/product", product);
app.use("/api/v1/order", order);
app.use("/api/v1/auth", wishlistRouter);
app.use("/api/v1/hero", heroRouter);

//razorpay route
app.use("/api/v1/payment", paymentRoute);

// Error handling middleware
app.use(error);

DB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running ${PORT} port`);
  });
});
