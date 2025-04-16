const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Course = require("../Model/courseModel");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/courses/';
    
    // Check if the directory exists, if not create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create the directory
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
exports.upload = upload; // Export it to use in your router

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const { courseName, courseDesc, duration, schedule } = req.body;
    const courseImg = req.file ? `uploads/courses/${req.file.filename}` : null;

    const newCourse = new Course({
      courseName,
      courseDesc,
      duration,
      courseImg,
      schedule: schedule ? JSON.parse(schedule) : [],
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing course
exports.updateCourse = async (req, res) => {
  try {
    const { courseName, courseDesc, duration, schedule } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Remove old image if new image uploaded
    if (req.file && course.courseImg) {
      const oldImagePath = path.join(__dirname, "..", course.courseImg);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.warn("Error deleting old image:", err.message);
      });
    }

    const updatedData = {
      courseName,
      courseDesc,
      duration,
      courseImg: req.file ? `uploads/courses/${req.file.filename}` : course.courseImg,
      schedule: schedule ? JSON.parse(schedule) : course.schedule,
    };

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Delete associated image
    if (course.courseImg) {
      const imagePath = path.join(__dirname, "..", course.courseImg);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn("Error deleting course image:", err.message);
      });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single course by ID
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
    // Schedule Management
 // Schedule Management - Updated to use indexes
exports.addSchedule = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const newSchedule = {
      days: req.body.days,
      mode: req.body.mode,
      price: req.body.price
    };

    course.schedule.push(newSchedule);
    await course.save();
    
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// In your courseRoute.js
exports.updateSchedule=async (req, res) => {
  try {
    console.log('Received update:', req.body); // Add this for debugging
    
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const scheduleIndex = parseInt(req.params.scheduleIndex);
    if (isNaN(scheduleIndex) || scheduleIndex < 0 || scheduleIndex >= course.schedule.length) {
      return res.status(400).json({ error: 'Invalid schedule index' });
    }

    // Explicitly update each field
    course.schedule[scheduleIndex].days = req.body.days;
    course.schedule[scheduleIndex].mode = req.body.mode;
    course.schedule[scheduleIndex].price = req.body.price;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ 
      error: error.message,
      details: error.errors 
    });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const { courseId, scheduleIndex } = req.params;
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    course.schedule.splice(scheduleIndex, 1);
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};