const express=require("express");
const Router = express.Router();
const {sendRequests, getAllRequests, updateRequestStatus} = require('../Controller/requestController');

Router.post('/', sendRequests);
Router.get('/', getAllRequests);
// In your requestRoutes.js
Router.put('/:id/status', updateRequestStatus);
module.exports=Router;

