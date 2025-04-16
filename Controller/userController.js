const express=require("express");
const mongoose=require("mongoose");
const {jwtSecret}=require("../config/Keys")
const User=require("../Model/userModel");
const jwt=require("jsonwebtoken");

exports.Login=async(req,res)=>{
    try {
        const {username, password}=req.body;
    const user= await User.findOne({name:username});
    if(!user){
        return res.status.send("no user with this username");
    }

    const isMatch=bcrypt.compare(password,user.password);
    if(isMatch){

        const payload={
            user:{
                id:user.id,
            }
        }

        jwt.sign(payload, jwtSecret, {expiresIn: "30d"},(err,token)=>{
            if(err) throw err;
            res.send("Welcome" + {token:token, user:user});
        });
    }
    else{
        res.send("Invalid username or password");
    }
    } catch (error) {
        res.status(401).json(error);
    }
    
}