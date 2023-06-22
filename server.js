
const exp= require('express')
const path = require('path')
const app =exp();
require('dotenv').config()

//Connecting to MongoDB Server
//import MonogClient
const mongoClient = require('mongodb').MongoClient;

app.use(exp.static(path.join(__dirname, './dist/mean-app')))

const dbUrl =  process.env.DBURL;


// const dbUrl = "mongodb+srv://k12345:Yeu2jCYK3DbPSRVi@cluster0.k3hqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//connect to DB


mongoClient.connect(dbUrl)
.then((client)=>{

    //get data object
    let databaseobject = client.db("CDB22DX009DB")
    //get collections object
    let userCollectionObject = databaseobject.collection("usercollection")
    let productCollectionObject = databaseobject.collection("productcollection")

    app.set("userCollectionObject",userCollectionObject)
    app.set("productCollectionObject",productCollectionObject)

    //share colection objects to APIs
    console.log("connecting to DB successfully")
})
.catch(err=> console.log("err in connecting to DataBase ", err)) 

const userApp = require('./backend/APIs/userAPI')
const productApp = require("./backend/APIs/productAPIs")
const adminApp = require('./backend/APIs/adminAPIs')


// add body parser middleware
app.use(exp.json())

app.use('/user', userApp)
app.use('/product', productApp)
app.use('/admin', adminApp)






app.get('/*',(req, res)=>{
    res.sendFile(path.join(__dirname,'./dist/mean-app/index.html'),err=>{
        if(err){
            next(err)
        }
    })
})


// handle invalid paths
app.use((req, res,next) => {
    res.status(404).send({message : `The path ${req.url} does not exist`})
})

// handle error handling
app.use((err,req,res,next)=>{
    res.status(500).send({message : err.message})
})

const PORT = 4000 || process.env.PORT ;

app.listen(PORT,()=>console.log(`HTTP Server Listening on port ${PORT} ..`));
