const express = require("express");
const upload = require("../utils/multer");
const tokenVerify = require("../middleware/auth.middleware");
const {
  productCreate,
  deleteProduct,
  productGet,
  oneProductGet,
  getAdminProduct,
  deleteProductPhoto,
  addProductPhoto,
  productUpdate,
} = require("../controllers/product.controller");

const router = express.Router();

router
  .route("/product-create")
  .post(
    tokenVerify,
    upload.fields([{ name: "img", maxCount: 7 }]),
    productCreate
  );

router.route("/getAdminProduct").get(tokenVerify, getAdminProduct);

router.route("/delete/:productId").delete(tokenVerify, deleteProduct);

router
  .route("/delete/product-img/:productId/:imgId")
  .delete(tokenVerify, deleteProductPhoto);

router
  .route("/add-one/product-img")
  .put(tokenVerify, upload.single("img"), addProductPhoto);

router.route("/product-update/:productId").put(tokenVerify, productUpdate);

router.route("/products").get(productGet);

router.route("/product/:id").get(oneProductGet);

module.exports = router;
