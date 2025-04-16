const path = require('path');


require("dotenv").config();
const express = require("express");
const connectDB = require("./config/DB");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use("/api/requests", require("./Router/requestRoute"));
app.use("/api/courses", require("./Router/courseRoute")); // You'll need to create this
// app.use("/api/users", require("./Router/userRoute")); // You'll need to create this
app.use("/api/testimonials", require("./Router/testimonyRoute")); // You'll need to create this
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/courses', express.static('uploads/courses'));

app.listen(5003, () => {
  console.log("Server is up on port 5003");
});

console.log("Mongo URI: ", process.env.DB_PRODUCTION);
