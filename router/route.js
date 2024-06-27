let express=require('express');
let model=require('../model/messagemodel')
let senderModel=require('../model/sendermodel');
let router=express.Router()



  router.get('/messages/:sender/:receiver', async (req, res) => {
    const { sender, receiver } = req.params;
  
    if (!sender || !receiver) {
      return res.status(400).send({ error: 'Sender and receiver IDs are required' });
    }
  
    try {
      const messages = await model.find({
        $or: [
            { sender: sender, receiver: receiver },
            { sender: receiver, receiver: sender }
        ]
    })
    .populate('sender')
    .populate('receiver')
    .sort({ timestamp: 1 }); // 1 for ascending, -1 for descending
      res.status(200).send(messages);
    } catch (error) {
      res.status(500).send({ error: 'Failed to retrieve messages',data:error });
    }
  });



  router.post('/delete/:_id/:senderId',async (req,res)=>{
      let id=req.params._id
      let senderId = req.params.senderId
        let sender = await senderModel.find({_id:senderId});
        if(sender){
          try{
            let data=await model.deleteOne({_id:id})
            console.log(data)
            res.send(data.acknowledged)

     }catch(err){
         res.send(err)
         console.log(err);
     }
        }
        else{
          res.send('user not authorised to delete this message');
        }
      
  })



  module.exports=router;