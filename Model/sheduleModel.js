const mongoose=require("mongoose");

const ScheduleSchema=mongoose.Schema(
    {
            
            courseName:{
                type:String,
                required:true
            },
            days:{
                type:String,
                required:true
            },
            mode:{
                type:String,
                required:true
            },
            price:{
                type:String,
                required:true
            }

    },{
        timestamps:true
    }
)

const schedule=mongoose.model("Schedule", ScheduleSchema)
module.exports=schedule;