const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const authMiddleware = require("../middleware/auth");

router.put('/updateProfile', authMiddleware, userController.UpdateProfile);
router.post('/login',userController.Login);
module.exports = router;
