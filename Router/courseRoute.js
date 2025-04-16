const express = require("express");
const Router = express.Router();
const {
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  addSchedule,
  getCourse,
  updateSchedule,
  deleteSchedule,
  upload
} = require("../Controller/courseController");

// Course routes
Router.get("/", getAllCourses);
Router.get("/:id",getCourse)
Router.post("/", upload.single("image"), addCourse);
Router.put("/:id", upload.single("image"), updateCourse);
Router.delete("/:id", deleteCourse);
Router.post('/:id/schedules', addSchedule);
Router.put('/:courseId/schedules/:scheduleIndex', updateSchedule);
Router.delete('/:courseId/schedules/:scheduleIndex', deleteSchedule);
module.exports = Router;
