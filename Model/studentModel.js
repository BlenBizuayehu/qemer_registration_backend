// models/Student.js
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    requestId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Student", StudentSchema);