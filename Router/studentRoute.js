// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentsController = require("../Controller/studentController");

router.get('/', studentsController.getAllStudents);
router.post('/', studentsController.createStudent);

module.exports = router;