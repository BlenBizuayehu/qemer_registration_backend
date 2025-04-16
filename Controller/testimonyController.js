const express = require("express");
const multer = require("multer");
const path = require("path");
const Testimony = require("../Model/testimonyModel");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Testimony Management

// Get all testimonies
exports.getAllTestimonies = async (req, res) => {
  try {
    const testimonies = await Testimony.find().sort({ createdAt: -1 });
    res.json(testimonies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new testimony
exports.addTestimony = async (req, res) => {
  try {
    // Handle file upload and form data
    const { name, role, text } = req.body;
    const picture = req.file ? req.file.filename : null; // Get the uploaded file's filename

    // Create a new testimony
    const newTestimony = new Testimony({
      name,
      role,
      text,
      picture, // Save the filename of the uploaded image
    });

    await newTestimony.save();
    res.status(201).json(newTestimony);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing testimony
exports.updateTestimony = async (req, res) => {
  try {
    const { name, role, text } = req.body;
    const picture = req.file ? req.file.filename : undefined; // Get the new uploaded file (if any)

    const updateData = { name, role, text };
    if (picture) updateData.picture = picture; // Only update picture if a new file is provided

    const updatedTestimony = await Testimony.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedTestimony) {
      return res.status(404).json({ error: "Testimony not found" });
    }
    res.json(updatedTestimony);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a testimony
exports.deleteTestimony = async (req, res) => {
  try {
    const deleted = await Testimony.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Testimony not found" });
    }
    res.json({ message: "Testimony deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
