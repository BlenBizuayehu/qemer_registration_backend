const express=require("express");
const Router = express.Router();
const {sendRequests, getAllRequests} = require('../Controller/requestController');

Router.post('/', sendRequests);
Router.get('/', getAllRequests);
module.exports=Router;

