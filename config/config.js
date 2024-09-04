let mongoose=require('mongoose');



let url= process.env.DATABASE


let dbconnection=()=>{return mongoose.connect(url).then(res=>{console.log('db is connected')}).catch(err=>{console.log(err)});
}
module.exports={dbconnection};
