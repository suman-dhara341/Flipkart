const Product = require("../models/product.model");
const review = require("../models/review.model");

const reviewAdd = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { userId } = req.id;
    const { productId } = req.params;

    if (!rating || !comment) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const res = await review.create({ rating, comment });
    if (!res) {
      return res
        .status(400)
        .json({ message: "Something was wrong", success: false });
    }
    const findProduct = await Product.findOne({ _id: productId });
    findProduct.numOfReviews = findProduct.numOfReviews + 1;
    findProduct.save();

    return res
      .status(201)
      .json({ message: "Review add successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const reviewDelete = async (req, res) => {
  try {
    const { userId } = req.id;
    const { productId } = req.params;

    const res = await review.deleteOne({ $and: [{ productId }, { userId }] });

    if (!res) {
      return res
        .status(400)
        .json({ message: "Something was wrong", success: false });
    }

    const findProduct = await Product.findOne({ _id: productId });
    findProduct.numOfReviews = findProduct.numOfReviews - 1;
    findProduct.save();

    return res
      .status(201)
      .json({ message: "Review deleted successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { reviewAdd, reviewDelete };
