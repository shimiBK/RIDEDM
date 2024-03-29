const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema(
    {
    eventName:{type:String , required:true},
    firstName:{type:String , required:true},
    lastName:{type:String, required:true},
    city:{type: String , required:true},
    time:{type: String , required:true},
    userID:{type:String, required:true},
    userImg:{type:String},
    userGender:{type:String,required:true},
},
{timestamps:true}
);

module.exports = mongoose.model("Ride" , RideSchema);