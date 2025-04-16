const express=require("express");
const Schedule=require("../Model/scheduleModel");
const User=require("../Model/userModel");

exports.AddSchedule=async(req,res)=>{
    try {
        const{scheduleId,courseName, days, via, price}=req.body;
        const schedule=await Schedule.create({scheduleId,courseName, days, via, price});
        res.send("Schedule"+" "+ schedule +" " +"added successfully");
    } catch (error) {
        
    }
}

exports.EditSchedule=async(req,res)=>{
    try {
        const{scheduleId,courseName, days, via, price }=req.body;
        const updateCourse=await Course.findByIdAndUpdate(
            req.params.id,
            {
                courseId,
                courseName,
                courseDesc,
                duration,

            },
            {new:true}
        );
        res.send("course" + updateCourse + "updated successfully");
    } catch (error) {
        res.send(error)
    }
}