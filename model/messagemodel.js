const { default: mongoose } = require("mongoose");

let messageSchema=mongoose.Schema({
    message:String,
    time:String,
    sender:String,
    senderId:String
})

let messagemodel=mongoose.model('messages',messageSchema);

module.exports=messagemodel;