const mongoose=require("mongoose");

const UserSchema=mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        }
    })
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Export it for use in your controllers/routes
    module.exports = User;