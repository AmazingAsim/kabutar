
let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../','profiles'))
    },
    filename:function(req,file,cb){
        console.log(`multer here ::: ${JSON.stringify(req.body)}`)
        cb(null,file.originalname)
    }
});

let upload = multer({storage:storage});

module.exports = upload;