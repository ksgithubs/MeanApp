const expressAsyncHandler = require("express-async-handler")

const bcryptjs = require("bcryptjs")

const jwt = require("jsonwebtoken")

require("dotenv").config()


const getUsers = expressAsyncHandler( async(req, res) => {

    console.log(req.headers)
    // to get data from index to userApis 
    let userCollectionObject= req.app.get("userCollectionObject")
    // To store getted array in an array
    let users = await userCollectionObject.find().toArray()
    //send res response
    res.status(200).send({message: "List of users",payload:users})
    
})
 
const getUsersByUsername =  expressAsyncHandler( async (req, res) => {


    // to get data from index to userApis 
    let userCollectionObject= req.app.get("userCollectionObject")

    // get user byid url
    // res.params  //{id:200}
    let usernameOfUrl = (+req.params.username);
    // get user by id from usercollection
    let user = await userCollectionObject.findOne({username:usernameOfUrl})

    res.send({ message:"user data", payload : user})
})





const createUser = expressAsyncHandler( async (req, res) => {

    // console.log(req.body.userObj)
    // console.log(req.file.path)

    
    let userObj = JSON.parse(req.body.userObj)
    userObj.profilePic=req.file.path;

    //get user obj 
    let userCollectionObject= req.app.get("userCollectionObject")
    // get new uer

    // let userObj = req.body;
    // insert userObj to usercollection
    let userOfDB =  await userCollectionObject.findOne({username:userObj.username})

    if (userOfDB!==null){
        res.status(200).send({message: "Username has already taken. Please choose another"})
    }
    else{
        // hash the password
        let hashedPassword = await bcryptjs.hash(userObj.password,5)
        userObj.password= hashedPassword;

        let result = await userCollectionObject.insertOne(userObj)

        res.status(201).send({message:"User Created"})
    }
}
)

const loginUser =  expressAsyncHandler (async (req, res) => {

    let userCollectionObject = req.app.get("userCollectionObject");
    let credObject  = req.body;

    let userOfDB =await userCollectionObject.findOne({username:credObject.username})

    if(userOfDB===null){
        
        res.send({message: "Invalid username"})

    }
    else {

        let status = await bcryptjs.compare(credObject.password,userOfDB.password)

        if(status ===false){
            res.send({message: "Invalid password"})
        }
        else{

            let signedToken = jwt.sign({username:userOfDB.username},process.env.SECRET,{expiresIn:2000})

            res.send({message: "success", token: signedToken,user:userOfDB})

        }
    }

})






const updateUser=  expressAsyncHandler (async (req, res) => {


    let userCollectionObject = req.app.get("userCollectionObject") 
    // get mofiies users obj
    let modifiedUserObj=req.body;
    //replace old user with modified user obj

    let result = await userCollectionObject.updateOne({username: modifiedUserObj.username},{$set:{...modifiedUserObj}})

    if(result.acknowledged=true){
        res.send({message : "user created successfully"})
    }
    else{
    res.send({message:" Error in user modification"})}

})






const deleteUser=  async(req, res) =>{

    let userCollectionObject = req.app.get("userCollectionObject") 

    let usernameFromUrl = req.params.username;
    
    let result = await userCollectionObject.deleteOne({username: usernameFromUrl})

    if(result.deletedCount==1){
        res.send({message : "user removed successfully"})
    }
    else{
    res.send({message:" Error in user deletion"})}
}

const getProtectedInfo=(req, res) => {
    res.send({message : "This is private information"})
}





module.exports = {getProtectedInfo,loginUser,getUsers,getUsersByUsername,createUser,updateUser,deleteUser}