const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notificationinstructorSchema = new mongoose.Schema({
    unique_key : {
        type : String
      },
    notification_instructor_id : {
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
    notification_instructor_status : {
        type : Number,
        required : true   
    },
    instructor_mark_as_read : {
        type : Number,
        required : true   
    }
   
})

module.exports = mongoose.Model("Notificationinstructor" , notificationinstructorSchema)

