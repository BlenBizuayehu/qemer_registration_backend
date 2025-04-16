const mongoose =require("mongoose");

const TestimonySchema=mongoose.Schema(
    {
      
        name:{
            type:String,
            required:true
        },
        picture:{
            type:String,
            required:true
        },
        text:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        }

    },{
        timestamps:true
    }
)

const testimony=mongoose.model("Testimony", TestimonySchema)
module.exports=testimony;