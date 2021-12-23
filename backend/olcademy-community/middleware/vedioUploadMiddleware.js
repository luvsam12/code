const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const multer = require('multer')
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}.${ext}`);
  }
});

exports.upload = multer({
  storage: multerStorage
  
});

cloudinary.config({
  cloud_name: "dxvc9qd2g",
  api_key: "765672581547499",
  api_secret: "cbU_DCL9fDVy6K-ymkaW2EfnCHA",
});

exports.uploadMiddleWare = async (req, res , next)=>{
    let url,public_id;let arrayOfUrlAndIds=[];
    
    for(let i=0;i<req.files.length ;i++){
      await cloudinary.uploader.upload(
        req.files[i].path,
        {
           resource_type: "auto",
          
           folder: "QuestionFiles"
         },
        function (err, result) {
          if (err) {
            console.log("Error", err.message);
            res.status(400).json({
                success: false,
                msg: "Error in Upload",
            });
          } else {
            fs.unlinkSync(req.files[i].path);
            url = result.url;
            public_id = result.public_id;
            let urlAndId = {}
            urlAndId.url = url
            urlAndId.public_id = public_id
            arrayOfUrlAndIds.push(urlAndId)
          }
        }
      )
    }

    req.arrayOfUrlAndIds = arrayOfUrlAndIds
    next()
  }

