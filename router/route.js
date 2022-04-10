let express=require('express');
let model=require('../model/messagemodel')
let router=express.Router()

router.get('/messages',async (req,res)=>{
    let data= await model.find()
    res.send(data);
  })

  router.delete('delete/:time',async (req,res)=>{
      let time=req.params.time
         try{
                let data=await model.deleteOne({time:time})
                res.send(data)

         }catch(err){
             res.send(err)
             console.log(err);
         }
  })


  module.exports=router;