const Router = require("express").Router();
const {
  carouselController,
  deleteCarousel,
  getCarousel,
} = require("../controllers/hero.controller");
const tokenVerify = require("../middleware/auth.middleware");
const upload = require("../utils/multer");

Router.route("/carousel").post(
  tokenVerify,
  upload.single("img"),
  carouselController
);

Router.route("/delete/:carouselId").delete(tokenVerify, deleteCarousel);
Router.route("/get-carousel").get(getCarousel);

module.exports = Router;
