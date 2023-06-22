const expressAsyncHandler = require("express-async-handler")


const jwt = require('jsonwebtoken');
const bcryptjs = require("bcryptjs")
require("dotenv").config()



// admin request
const adminLogin = (req,res)=>{
    let adminObj=req.body;
    if(adminObj.username!=="admin"){
        res.send({message:"Invalid username"})
    }
    else if(adminObj.password!=="admin"){
        res.send({message:"Invalid password"})
    }
    else{
        //create token
        let signedToken = jwt.sign({username:adminObj.username},process.env.SECRET,{expiresIn:100})
        // send Token
        res.send({message:"success",token:signedToken,admin:adminObj})

    }
}


const createProduct = async(req,res)=>{
    let productObj = JSON.parse(req.body.productObj)

    productObj.profilePic = req.file.path;
    let productCollectionObject = req.app.get("productCollectionObject")


    let result = await productCollectionObject.insertOne(productObj);
    res.status(201).send({message:"product created"})





}

const getProducts = (req,res)=>{

}

const updateProduct = (req,res)=>{

}

const deleteProduct = (req,res)=>{

}


module.exports ={adminLogin,createProduct,updateProduct,deleteProduct,getProducts}