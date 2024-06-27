const { default: mongoose } = require("mongoose");

let senderSchema=mongoose.Schema({
    user_name:{type:String,required:true},
    user_email:{type:String,required:true},
    user_password:{type:String,required:true},
    user_profile:{type:String,required:false}
})

let sendermodel=mongoose.model('users',senderSchema);

module.exports=sendermodel;

