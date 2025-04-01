const cloudinary = require("cloudinary").v2;
const { log } = require("console");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUpdate = async (img) => {
  try {
    const result = await cloudinary.uploader.upload(img);
    if (fs.existsSync(img)) {
      fs.unlinkSync(img);

      return { url: result.url, public_id: result.public_id };
    }
  } catch (error) {
    fs.unlinkSync(img);
    console.log(error);
  }
};

const cloudinaryDelete = async (publicId) => {
  try {
    const response = await cloudinary.api.delete_resources([publicId]);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { cloudinaryUpdate, cloudinaryDelete };
