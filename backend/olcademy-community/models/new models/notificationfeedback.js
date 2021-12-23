const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationfeedbackSchema = new mongoose.Schema({
    notification_feedback_id:{
        type: Number,
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course_id:{
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
    },
    course_section_id:{
        type: Schema.Types.ObjectId,
        ref: "Coursesectiondetails",
        required: true,
    },
    unique_key:{
        type: String,
    },
    course_batch_id:{
        type: Schema.Types.ObjectId,
        ref: "Coursebatch",
        required: true,
    },
    feedback_mark_as_read:{
        type: Number,
    },
});

module.exports = mongoose.model("Notificationfeedback", notificationfeedbackSchema);
