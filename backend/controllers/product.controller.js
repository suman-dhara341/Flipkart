const Product = require("../models/product.model");
const {
  cloudinaryUpdate,
  cloudinaryDelete,
} = require("../services/cloudinary");

const productCreate = async (req, res) => {
  try {
    const { id } = req.id;

    if (!req.id.isAdmin) {
      return res
        .status(500)
        .json({ message: "Unauthorized access", success: false });
    }

    const {
      name,
      description,
      price,
      discount,
      finalPrice,
      category,
      brand,
      stock,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !discount ||
      !finalPrice ||
      !category ||
      !brand ||
      !stock
    ) {
      return res
        .status(400)
        .json({ message: "All fields are require", success: false });
    }

    const img = [];
    if (req.files) {
      await Promise.all(
        req.files?.img?.map(async (file) => {
          const respond = await cloudinaryUpdate(file?.path);
          img.push(respond);
        })
      );
    }

    const data = {
      name,
      description,
      price,
      discount,
      finalPrice: Math.ceil(finalPrice),
      category,
      brand,
      stock,
      images: img,
      createdBy: id,
    };

    await Product.create(data);
    return res.status(201).json({ message: "Product created", success: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!req.id.isAdmin) {
      return res
        .status(500)
        .json({ message: "Unauthorize access", success: false });
    }
    const createdBy = req.id.id;
    const { productId } = req.params;

    const findProduct = await Product.findOne({
      $and: [{ _id: productId }, { createdBy }],
    });

    if (!findProduct) {
      return res
        .status(400)
        .json({ message: "Unauthorize access", success: false });
    }
    if (findProduct?.images?.length > 0) {
      await Promise.all(
        findProduct?.images?.map((item) => cloudinaryDelete(item?.public_id))
      );
    }
    const deleted = await Product.deleteOne({
      $and: [{ createdBy }, { _id: productId }],
    });
    return res
      .status(200)
      .json({ message: "Product Deleted Successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteProductPhoto = async (req, res) => {
  try {
    if (!req.id.isAdmin) {
      return res
        .status(500)
        .json({ message: "Unauthorize access", success: false });
    }
    const createdBy = req.id.id;
    const { productId, imgId } = req.params;

    const findProduct = await Product.findOne({
      $and: [{ _id: productId }, { createdBy }],
    });

    if (!findProduct) {
      return res
        .status(400)
        .json({ message: "Product not found", success: false });
    }
    const index = findProduct?.images?.findIndex(
      (index) => index._id.toString() === imgId
    );

    await cloudinaryDelete(findProduct?.images[index].public_id);

    findProduct?.images.splice(index, 1);
    await findProduct.save();

    return res
      .status(200)
      .json({ message: "Image Deleted Successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const addProductPhoto = async (req, res) => {
  try {
    if (!req.id.isAdmin) {
      return res
        .status(500)
        .json({ message: "Unauthorized access", success: false });
    }
    const { productId } = req.body;

    const findProduct = await Product.findOne({ _id: productId });
    if (!findProduct) {
      return res.status(400).json({ message: "Product is not found" });
    }

    const respond = await cloudinaryUpdate(req.file?.path);

    findProduct.images.push(respond);
    await findProduct.save();

    return res
      .status(201)
      .json({ message: "Image add successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const productUpdate = async (req, res) => {
  try {
    if (!req.id.isAdmin) {
      return res
        .status(500)
        .json({ message: "Unauthorize access", success: false });
    }
    const {
      name,
      description,
      price,
      discount,
      finalPrice,
      category,
      brand,
      stock,
    } = req.body;
    const createdBy = req.id.id;
    const { productId } = req.params;

    const findProduct = await Product.findOne({
      $and: [{ _id: productId }, { createdBy }],
    });

    if (!findProduct) {
      return res.status(400).json({
        message: "Product Not fount or Unauthorize access",
        success: false,
      });
    }
    if (name) findProduct.name = name;
    if (description) findProduct.description = description;
    if (price) findProduct.price = price;
    if (discount) findProduct.discount = discount;
    if (finalPrice) findProduct.finalPrice = finalPrice;
    if (category) findProduct.category = category;
    if (brand) findProduct.brand = brand;
    if (stock !== undefined) findProduct.stock = stock;

    await findProduct.save();
    return res.status(201).json({ message: "Product Updated", success: true });
  } catch (error) {
    console.log(error);
  }
};

const getAdminProduct = async (req, res) => {
  try {
    if (!req.id.isAdmin) {
      return res
        .status(500)
        .json({ message: "Unauthorize access", success: false });
    }

    const products = await Product.find({ createdBy: req.id.id });
    if (!products) {
      return [];
    }

    return res.status(200).json({ products, success: true });
  } catch (error) {
    console.log(error);
  }
};

// user

const productGet = async (req, res) => {
  try {
    const {
      limit = 28,
      page,
      search,
      category,
      minPrice,
      maxPrice,
    } = req.query;

    const query = {};

    const orConditions = [];
    if (search) {
      orConditions.push({ name: { $regex: search, $options: "i" } });
      orConditions.push({ category: { $regex: search, $options: "i" } });
    }

    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    if (category) query.category = { $regex: category, $options: "i" };
    if (minPrice || maxPrice) {
      query.finalPrice = {};
      if (minPrice) query.finalPrice.$gte = Number(minPrice);
      if (maxPrice) query.finalPrice.$lte = Number(maxPrice);
    }

    if (!search) return res.json({ allProduct: [] });

    const skip = (page - 1) * limit;
    const allProduct = await Product.find(query).skip(skip).limit(limit);

    if (!allProduct) {
      return res
        .status(400)
        .json({ message: "No product found", success: false });
    }

    // Get total product count based on query
    const totalProducts = await Product.countDocuments(query);

    // Get all unique category names
    const allCategories = await Product.distinct("category");

    return res
      .status(200)
      .json({ allProduct, totalProducts, allCategories, success: true });
  } catch (error) {
    console.log(error);
  }
};

const oneProductGet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Id is required", success: false });
    }

    const product = await Product.findOne({ _id: id });
    if (!res) {
      return res
        .status(400)
        .json({ message: "No product found", success: false });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  productCreate,
  deleteProduct,
  productUpdate,
  productGet,
  oneProductGet,
  getAdminProduct,
  deleteProductPhoto,
  addProductPhoto,
};
