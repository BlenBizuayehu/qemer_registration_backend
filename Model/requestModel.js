const mongoose=require("mongoose");

const RequestSchema = mongoose.Schema({
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
    }
  }, {
    timestamps: true
  });
const request=mongoose.model("Request", RequestSchema)

module.exports=request;
