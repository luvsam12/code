const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const notificationstudentrefundSchema = new mongoose.Schema({
    unique_key : {
        type : String
    },
    notification_student_refund_id : {
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
    notification_student_refund_text : {
        type : String,
        required : true
    },
    notification_student_mark_as_read : {
        type : Number,
        required : true   
    }
})

module.exports = mongoose.Model("Notificationstudentrefund" , notificationstudentrefundSchema )