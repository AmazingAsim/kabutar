let mongoose=require('mongoose');



let url='mongodb+srv://AmazingAsim:AmazingAsim3000@amazingasim.tqrgz.mongodb.net/kabutar?retryWrites=true&w=majority'


let dbconnection=()=>{return mongoose.connect(url).then(res=>{console.log('db is connected')}).catch(err=>{console.log(err)});
}
module.exports={dbconnection};
