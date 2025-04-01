const wishlist = require("../models/wishlist.model");

const createWishlist = async (req, res) => {
  try {
    const { id } = req.id;
    const { productId } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Unauthorize access", success: false });
    }
    let findWishlist = await wishlist.findOne({ userId: id });

    if (findWishlist) {
      const index = findWishlist.productId.findIndex(
        (item) => item.toString() === productId
      );
      if (index > -1) {
        findWishlist.productId.splice(index, 1);
        await findWishlist.save();
      } else {
        findWishlist.productId.unshift(productId);
        await findWishlist.save();
      }

      findWishlist = await wishlist
        .findOne({ userId: id })
        .populate("productId");

      return res.status(200).json({
        message: index > -1 ? "Item removed" : "Item saved",
        wishlist: findWishlist,
        success: true,
      });
    }

    const getWishlist = await wishlist.create({ productId, userId: id });
    return res
      .status(200)
      .json({ message: "Item save", wishlist: getWishlist, success: true });
  } catch (error) {
    console.log(error);
  }
};

const getWishlist = async (req, res) => {
  try {
    const { id } = req.id;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Unauthorize access", success: false });
    }
    const findWishlist = await wishlist
      .findOne({ userId: id })
      .populate("productId");
    if (!findWishlist) {
      return [];
    }

    return res.status(200).json({ wishlist: findWishlist, success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createWishlist, getWishlist };
