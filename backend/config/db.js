const mongoose = require("mongoose");

const DB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connection succesfull");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DB;
