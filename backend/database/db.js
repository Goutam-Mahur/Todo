const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL || "");
    console.log("database connected successfully");
  } catch (error) {
    console.log("some error occured while connecting to db : ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
