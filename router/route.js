let express=require('express');
let model=require('../model/messagemodel')
let router=express.Router()

router.get('/messages',async (req,res)=>{
    let data= await model.find()
    res.send(data);
  })

  router.delete('/delete/:_id',async (req,res)=>{
      let id=req.params._id

      console.log(id)
      console.log(typeof(id))
         try{
                let data=await model.deleteOne({_id:id})
                console.log(data)
                res.send(data.acknowledged)

         }catch(err){
             res.send(err)
             console.log(err);
         }
  })


  module.exports=router;