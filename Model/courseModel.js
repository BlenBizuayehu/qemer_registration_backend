const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  courseImg:{
    type:String,
    required:true
  },
  courseDesc: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  schedule: [{
    
    days: {
      type: String,
      required: true
    },
    time:{
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true,
      enum: ['Online', 'In-person', 'Hybrid']
    },
    price: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Course", CourseSchema);