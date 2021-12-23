const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notificationlectureSchema = new mongoose.Schema({
    unique_key : {
        type : String
      },
    notification_lecture_id : {
       type : Number
    },
    user_id : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course_id : {
        type : Schema.Types.ObjectId,
        ref : "Courses",
        required : true
    },
    course_batch_id: {
        type: Schema.Types.ObjectId,
        ref: "Coursebatch",
        required: true,
      },
    course_section_id: {
        type: Schema.Types.ObjectId,
        ref: "Coursesectiondetails",
        required: true,
      },
    notification_lecture_text : {
        type : String,
        required : true
    },
    lecture_mark_as_read : {
        type : Number,
        required : true   
    }
})

module.exports = mongoose.Model("Notificationlecture" , notificationlectureSchema)