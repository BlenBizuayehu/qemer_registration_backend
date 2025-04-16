const Request = require("../Model/requestModel");
const Course = require("../Model/courseModel");
const Testimony = require("../Model/testimonyModel");

exports.sendRequests=async(req,res) =>{
    try {
        const { Name, Phone, Course, Day, Mode, Price } = req.body;

        const nameParts = Name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || 'Unknown';

         const newRequest = new Request({
      requestId: `REQ-${Date.now()}`,
      studentName: {
        firstName,
        lastName
      },
      phone: Phone,
      program: {
        courseName: Course,
        duration: Day,
        schedule: Mode,
        price: Price
      }
    });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error saving request:', error);
    res.status(400).json({ 
      error: error.message,
      details: error.errors 
    });
  }
};


// Request Management
exports.getAllRequests = async (req, res) => {
try {
const requests = await Request.find().sort({ createdAt: -1 });
res.json(requests);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const request = await Request.findOneAndUpdate(
      { requestId },
      { status },
      { new: true }
    );
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
