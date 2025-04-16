require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.DB_PRODUCTION,
  JwtSecret: process.env.JWT_SECRET
};
