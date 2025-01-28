const userModel = require('../model/sendermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let {ObjectId} = require('mongodb');


async function signUp(user){
let salt = await bcrypt.genSalt(10);
let hashpass = await bcrypt.hash(user.user_password,salt);

let newuser = new userModel({
    user_name:user.user_name,
    user_email:user.user_email,
    user_password:hashpass
});

return newuser.save()
}

let showUser = ()=>{
    return userModel.find();
}

let login = async(user)=>{
  try {
    let result = await userModel.findOne({user_email:user.user_email});
    if(result==null){
        return 'invalid email'
    }

    let validPassword = await bcrypt.compare(user.user_password,result.user_password);

    if(!validPassword){
        return 'invalid password'
    }

    let payload = {id:result._id,email:result.user_email};
    let token = await jwt.sign(payload,'watcher');
    console.log(token)
    return {jwt:token,id:result._id};
  } catch (error) {
     console.log(error)
  }
}






let currentUser = async (id)=>{
    
    return userModel.findOne({_id:id})
}

let addProfile = (id,profileImage)=>{
    return userModel.updateOne({_id:(id)},{user_profile:profileImage})
}

module.exports = {showUser,signUp,login,currentUser,addProfile}