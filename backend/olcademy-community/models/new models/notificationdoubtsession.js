const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationdoubtsessionSchema = new mongoose.Schema({
    notify_doubtsess_id:{
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
    notify_session_text:{
        type: String,
    },
    course_batch_id:{
        type: Schema.Types.ObjectId,
        ref: "Coursebatch",
        required: true,
    },
    session_mark_as_read:{
        type: Number,
    },
    doubt_session_id:{
        type: Schema.Types.ObjectId,
        ref: "Doubtcleaningsession",
        required: true,
    },
});

module.exports = mongoose.model("Notificationdoubtsession", notificationdoubtsessionSchema);
