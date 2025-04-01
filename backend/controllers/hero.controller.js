const carousel = require("../models/carousel.model");
const {
  cloudinaryUpdate,
  cloudinaryDelete,
} = require("../services/cloudinary");

const carouselController = async (req, res) => {
  try {
    const { id, isAdmin } = req.id;
    const { name } = req.body;

    if (!isAdmin) {
      return res
        .status(500)
        .json({ message: "Unauthorized access", success: false });
    }
    if (!name) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    let img;
    if (req.file) {
      img = await cloudinaryUpdate(req?.file?.path);
      if (!img) {
        return res
          .status(400)
          .json({ message: "image Upload failed", success: false });
      }
    }

    const data = {
      name,
      url: img.url,
      public_id: img.public_id,
      createdBy: id,
    };

    const saveData = await carousel.create(data);
    if (!saveData) {
      return res
        .status(400)
        .json({ message: "Data save problem", success: false });
    }

    return res
      .status(200)
      .json({ message: "Carousal added Successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteCarousel = async (req, res) => {
  try {
    const { id, isAdmin } = req.id;
    const { carouselId } = req.params;

    if (!isAdmin) {
      return res
        .status(500)
        .json({ message: "Unauthorized access", success: false });
    }

    const findCarousel = await carousel.findOne({
      _id: carouselId,
      createdBy: id,
    });
    if (!findCarousel) {
      return res.status(200).json({ message: "No data found", success: false });
    }
    await cloudinaryDelete(findCarousel?.public_id);

    const deleteItem = await carousel.deleteOne({
      _id: carouselId,
      createdBy: id,
    });

    if (!deleteItem) {
      return res
        .status(400)
        .json({ message: "Something was wrong", success: false });
    }

    return res
      .status(200)
      .json({ message: "Deleted successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const getCarousel = async (req, res) => {
  try {
    const allCarousel = await carousel.find();
    return res.status(200).json({ allCarousel, success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { carouselController, deleteCarousel, getCarousel };
