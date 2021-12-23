const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const notifymandatorydoubtsessionSchema = new mongoose.Schema({
    unique_key : {
        type : String
    },
    notify_mdoubtsess_id: {
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
    notify_msession_text : {
       type : String, 
       required : true
    },
    session_mark_as_read : {
        type : Number,
        required : true
    },
    doubt_clearing_session_id : {
        type : Number,
        required : true
    }

})


module.exports = mongoose.Model("Notifymandatorydoubtsession" , notifymandatorydoubtsessionSchema)