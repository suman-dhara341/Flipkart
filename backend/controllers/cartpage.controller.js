const Cart = require("../models/cartPage.module");
const Product = require("../models/product.model");

const getCartItem = async (req, res) => {
  try {
    const { id } = req.id;
    const getProduct = await Cart.findOne({ userId: id }).populate(
      "product.productId"
    );
    if (!getProduct) {
      return res.status(400).json({ message: "No item found", success: false });
    }

    return res
      .status(200)
      .json({ getProduct: getProduct.product, success: true });
  } catch (error) {
    console.log(error);
  }
};

const createCartItem = async (req, res) => {
  try {
    const { id } = req.id;

    const { productId } = req.params;

    const findProduct = await Cart.findOne({ userId: id });

    const stock = await Product.findOne({ _id: productId });

    // re
    if (findProduct) {
      const index = findProduct.product.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (index > -1) {
        if (stock.stock > findProduct.product[0].quantity) {
          findProduct.product[index].quantity += 1;
        } else {
          return res
            .status(400)
            .json({ message: "You cannot add more item", success: false });
        }
      } else if (stock.stock > 0) {
        findProduct.product.unshift({ productId });
      } else {
        return res
          .status(400)
          .json({ message: "Out of stock", success: false });
      }

      await findProduct.save();

      return res
        .status(201)
        .json({ message: "Product added to cart", success: true });
    }

    await Cart.create({
      userId: id,
      product: { productId },
    });

    return res
      .status(201)
      .json({ message: "Product added to cart", success: true });
  } catch (error) {
    console.log(error);
  }
};

const oneCartItemDelete = async (req, res) => {
  try {
    const { id } = req.id;
    const { productId } = req.params;
    const findProduct = await Cart.findOne({ userId: id }).populate(
      "product.productId"
    );

    if (findProduct) {
      const index = findProduct.product.findIndex(
        (item) => item.productId._id.toString() === productId
      );

      if (index > -1) {
        if (findProduct.product[index].quantity > 1) {
          findProduct.product[index].quantity -= 1;
        } else {
          findProduct.product.splice(index, 1);
        }
      }

      await findProduct.save();

      return res
        .status(201)
        .json({ message: "One Item delete", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCartItem, createCartItem, oneCartItemDelete };
module.exports = { getCartItem, createCartItem, oneCartItemDelete };
