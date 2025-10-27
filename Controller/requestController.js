const Request = require("../Model/requestModel");
const Course = require("../Model/courseModel");
const studentController = require('./studentController');
const Testimony = require("../Model/testimonyModel");
const Student = require("../Model/studentModel");


exports.sendRequests=async(req,res) =>{
    try {
        const { Name, Phone, Course, Day, Time, Mode, Price } = req.body;

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
        time: Time,
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
    const { id } = req.params;
    const { status } = req.body;

    // Validate status input
    const validStatuses = ['Pending', 'Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const request = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // If approved, create student and delete request
    if (status === 'Approved') {
      const newStudent = new Student({
        name: `${request.studentName.firstName} ${request.studentName.lastName}`,
        phone: request.phone,
        program: request.program.courseName,
        enrollmentDate: new Date(),
        requestId: request.requestId
      });

      await newStudent.save();
      await Request.findByIdAndDelete(id);
      
      return res.json({
        message: 'Request approved and moved to students',
        student: newStudent
      });
    }

    res.json(request);
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // Create student from request data
    const newStudent = new Student({
      name: `${request.studentName.firstName} ${request.studentName.lastName}`,
      phone: request.phone,
      program: request.program.courseName,
      enrollmentDate: new Date(),
      requestId: request.requestId
    });

    // Save the student
    const savedStudent = await newStudent.save();
    
    // Delete the approved request
    await Request.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Request approved and moved to students',
      student: savedStudent
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Error approving request' 
    });
  }
};
