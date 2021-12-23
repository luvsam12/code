const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationRequestBuyStudentSchema = new mongoose.Schema({

    notification_accept_request_id: {
        type:Number,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    course_batch_id:{
        type: Schema.Types.ObjectId,
        ref: "Coursebatch",
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

module.exports = mongoose.model("NotificationRequestBuyStudent", notificationRequestBuyStudentSchema);
