const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const temporarycroppedimageSchema = new mongoose.Model({
    cropped_image_count : {
        type : String
    },
    cropped_image_path : {
        type : String
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
      },
    trainer_id : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    is_image_or_video : {
       type : String
    },
    is_image_cropped : {
        type : String
    },
    cropped_image_save : {
        type : String
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
})

module.exports = mongoose.Model("Temporarycroppedimage" , temporarycroppedimageSchema)