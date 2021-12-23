const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const notificationinstructorbuySchema = new mongoose.Schema({
    unique_key : {
        type : String
      },
    notification_instructor_buy_id  : {
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
    notification_instructor_text  : {
        type : String,
        required : true
    },
    notification_instructor_mark_as_read : {
        type : Number,
        required : true   
    } 
})

module.exports = mongoose.Model("Notificationinstructorbuy" , notificationinstructorbuySchema)

