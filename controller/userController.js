let userRepo = require('../repo/user_repo');
let path = require('path');
let fs = require('fs');


let getusers = async(req,res)=>{
    try {
        let result = await userRepo.showUser();
        console.log(result)
        res.status(200).send(result);
    } catch (err) {
        console.log(err)
    }
}

let signUp =async(req,res)=>{
    try { 
        let user = req.body;
        let result = await userRepo.signUp(user);
        res.status(201).send({message:"account is created",res:result});
    } catch (error) {
        console.log(error);
        res.send({message:"someting went wrong",res:error});
    }
}

let login = async(req,res)=>{
    
        let user = req.body;
        let result = await userRepo.login(user);
        if(result === 'invalid email' || result ==='invalid password'){
            res.send({message:'invalid password or email',res:result,validLogin:false})
        }
        else{
            res.status(201).send({message:"Login successfull",
                validLogin:true,
                email:user.user_email,
                jwt:result.jwt,
                id:result.id
            })
        }

    }


let currentUser = async(req,res)=>{
    try {
    let id = req.params.id;

    let result = await userRepo.currentUser(id);
    if(result != null){
        res.send(result)
    }
    
    } catch (error) {
        res.send({message:"someting went wrong",res:error})
    }
}

let addProfile = async(req,res)=>{
    if(!req.file){
        res.send({message:"no file is selected",flag:false});
    }
    let user = await userRepo.currentUser(req.body._id);
    if(user.user_profile){
        const profilePath = path.join(__dirname,'..','profiles',user.user_profile);
        if(fs.existsSync(profilePath)){
            fs.unlinkSync(profilePath);
        }
    }
   
    
    else{
        let fileName = req.file.originalname
        let result = await userRepo.addProfile(req.body._id,fileName);
        res.send({message:'profile image saved',flag:true,res:result})
    }
}

let getImage = async(req,res)=>{
    res.sendFile(path.join(__dirname,'..','profiles',req.params.profileImage))
}




  

module.exports = {addProfile,getImage,login,signUp,getusers,currentUser}