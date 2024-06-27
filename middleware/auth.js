let jwt = require('jsonwebtoken');

const checkJwtToken = async (req,res,next)=>{
    let jwttoken = req.cookies.jwt;
    console.log(req.cookies.jwt)
    if(!jwttoken){
        res.send('unauth attempt');
    }
    else{
        let verified = await jwt.verify(jwttoken,'watcher');
        if(!verified){
            res.send('unauthorized attempt')
        }
        else{
            next()
        }
    }
}

module.exports = {checkJwtToken}