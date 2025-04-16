const mongoose = require("mongoose");
const config = require("./Keys");

const DB = config.MONGO_URI;
const connectionDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB connected");
  } catch (error) {
    console.log("Not connected to DB: " + error.message);
    process.exit(1);
  }
};

module.exports = connectionDB;
