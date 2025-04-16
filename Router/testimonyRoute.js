const express = require("express");
const multer = require("multer");
const path = require("path");
const { getAllTestimonies, addTestimony, updateTestimony, deleteTestimony } = require("../Controller/testimonyController");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the filename
  },
});

const upload = multer({ storage });

// Testimony routes
const Router = express.Router();

Router.get("/", getAllTestimonies);
Router.post("/", upload.single("picture"), addTestimony); // Use upload middleware here
Router.put("/:id", upload.single("picture"), updateTestimony); // Use upload middleware here
Router.delete("/:id", deleteTestimony);

module.exports = Router;
