
///Create mini express app (user app)

const exp =require("express")
const userApp =exp.Router()
const {
  getProtectedInfo,
  getUsers,
  getUsersByUsername,
  createUser,updateUser,
  deleteUser,loginUser} = require("../controllers/userController")


const verifyToken=require("../middlewares/verifyToken")


const cloudinary =require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const multer = require("multer")


cloudinary.config({
    cloud_name:"devsxcxxa",
    api_key:"578587677669482",
    api_secret:"bnE1TA9tc6gBnxgHNWbhLTF99DU"

})

// multer-Cloudinary-Storage 

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'User Images',
    //   format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => file.fieldname+'-'+ Date.now(),
    },
  });

// configure multer
const upload = multer({storage:cloudStorage})



// Create USER API

// An async function
userApp.get('/get-users', getUsers )

// get USER by ID
userApp.get('/get-user/:username',getUsersByUsername)

// CREATE USER

userApp.post('/create-user', upload.single('profilePic'),createUser)

//login user
userApp.post('/login-user',loginUser)

// update user

userApp.put('/update-user',updateUser)

// delete user by id 
userApp.delete("/delete-user/:username",deleteUser)

//Protected routes
userApp.get("/get-protected-data",verifyToken,getProtectedInfo)


module.exports=userApp;


