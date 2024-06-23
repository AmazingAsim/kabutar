const { default: mongoose } = require("mongoose");

let senderSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:String
})

let sendermodel=mongoose.model('users',senderSchema);

module.exports=sendermodel;

