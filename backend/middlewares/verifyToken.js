const jwt= require('jsonwebtoken');
require('dotenv').config()

const verifyToken=(req,res,next)=>{

    //token verification logic
    // console.log(req.headers)

    let bearerToken = req.headers.authorization;
    // console.log("BEARER token is ",bearerToken)

    // if req headers do not have bearer taken
    if(bearerToken==undefined){
        res.send({message:"You are not authorised too access this info"})
    }
    // if bearer is existed
    else{
        //get token for bearer method
       let token =  bearerToken.split(" ")[1];
    //    console.log(token)
       jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
           console.log("err is oooo",err)
           if (err){
               console.log("err is o",err)
               res.send({message:"Session expired .. relogin to continue.."})
           }

           else{
               next()
           }
       })

    }

}

module.exports=verifyToken;
