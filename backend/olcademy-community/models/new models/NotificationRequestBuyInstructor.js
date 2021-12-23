const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationRequestBuyInstructorSchema = new mongoose.Schema({
    
    notification_buy_request_id: {
        type:Number,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        type: Number,
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        type: String,
    },
    unique_key: {
        type: String,
    },
    notification_request_buy_text: {
        type: String,
    },
    notification_request_mark_as_read: {
        type: Number,
    },

});

module.exports = mongoose.model("NotificationRequestBuyInstructor", NotificationRequestBuyInstructorSchema);
