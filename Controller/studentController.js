// controllers/studentController.js
const Student = require("../Model/studentModel");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ enrollmentDate: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};