// Controller/userController.js
const jwt = require('jsonwebtoken');
const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
exports.Login=async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || 'your_fallback_secret', // Never use fallback in production
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        
      );
      console.log('JWT_SECRET:', process.env.JWT_SECRET);

  
      // Send the token in the response
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.UpdateProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const { email, password, currentPassword } = req.body;
  
      // Verify current password first
      const user = await User.findById(userId);
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
  
      const updateData = { email };
      
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      ).select("-password");
  
      res.status(200).json({ 
        message: "Profile updated successfully",
        user: updatedUser 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };