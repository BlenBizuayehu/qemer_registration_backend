// models/Request.js
const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    requestId: {
        type: String,
        required: true
    },
    studentName: {
        type: {
            firstName: String,
            lastName: String
        },
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    program: {
        type: {
            courseName: String,
            duration: String,
            schedule: String,
            price: String
        },
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Request", RequestSchema);