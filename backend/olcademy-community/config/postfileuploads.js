const multer = require("multer");
const path = require("path");
const webp = require("webp-converter");
const fs = require("fs");
// this will grant 755 permission to webp executables
webp.grant_permission();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dxvc9qd2g",
  api_key: "765672581547499",
  api_secret: "cbU_DCL9fDVy6K-ymkaW2EfnCHA",
});

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "public/uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + path.extname(file.originalname));
  },
});

//route for handling image uploads
// const uploadImages = async (req, res) => {
//   var mediaArrayWithLink = [];
//   var mediaArray = [];
//   var tagArray = [];
//   for (var i = 0; i < req.files.length; i++) {
//     var fileName = req.files[i].path.replace(/^.*[\\\/]/, "").split(".")[0];
//     var path = "public/uploads/" + fileName + ".webp";
//     var tag =
//       "<div><img src='http://localhost:7000/" + path.substring(6) + "' ></div>";
//     mediaArray.push("./" + path);
//     tagArray.push(tag);
//     await webp
//       .cwebp(req.files[i].path, "public/uploads/" + fileName + ".webp", "-q 80")
//       .then((response) => {});
//   }
//   for (var i = 0; i < req.files.length; i++) {
//     fs.unlinkSync(req.files[i].path);
//   }
//   mediaArrayWithLink.push(mediaArray);
//   mediaArrayWithLink.push(tagArray);
//   res.json(mediaArrayWithLink);
// };

const uploadImages = async (req, res) => {
  var mediaArrayWithLink = [];
  var mediaArray = [];
  var tagArray = [];
  for (var i = 0; i < req.files.length; i++) {
    // webp
    //   .cwebp(req.files[i].path, "public/uploads/" + fileName + ".webp", "-q 80")
    //   .then((response) => {});
    // var fileName = req.files[i].path.split(".")[0] + ".webp";
    //console.log(fileName);
    await cloudinary.uploader.upload(
      req.files[i].path,
      { folder: "postImages" },
      function (err, result) {
        if (err) {
          fs.unlinkSync(req.files[i].path);
        } else {
          console.log(result);
          var tag = "<div><img src='" + result.url + "' ></div>";
          fs.unlinkSync(req.files[i].path);
          mediaArray.push(result.url);
          tagArray.push(tag);
        }
      }
    );
  }
  mediaArrayWithLink.push(mediaArray);
  mediaArrayWithLink.push(tagArray);
  res.json(mediaArrayWithLink);
};

const upload = multer({ storage: storage });

module.exports = {
  storage,
  upload,
  uploadImages,
};
