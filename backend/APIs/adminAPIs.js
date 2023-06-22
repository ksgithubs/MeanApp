
const exp =require("express")
const adminApp =exp.Router()


const cloudinary =require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const multer = require("multer")


const{adminLogin,createProduct,updateProduct,getProducts,deleteProduct} = require("../controllers/adminController")




cloudinary.config({
    cloud_name:"devsxcxxa",
    api_key:"578587677669482",
    api_secret:"bnE1TA9tc6gBnxgHNWbhLTF99DU"

})



const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Product Images',
    //   format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => file.fieldname+'-'+ Date.now(),
    },
  });

// configure multer
const upload = multer({storage:cloudStorage})

adminApp.post("/login",adminLogin)
adminApp.post("/create-product", upload.single('profilePic'),createProduct)
// adminApp.get("/view-products",getProducts)
// adminApp.get("")

module.exports=adminApp;
