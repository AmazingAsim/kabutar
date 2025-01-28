const { default: mongoose } = require("mongoose");

let messageSchema=mongoose.Schema({
    messageBody: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      }
})

let messagemodel=mongoose.model('messages',messageSchema);

module.exports=messagemodel;