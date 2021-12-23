const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationRequestBatchSchema = new mongoose.Schema({
    
    notify_request_id: {
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
    unique_key: {
        type: String,
    },
    notify_request_batch_text: {
        type: String,
    },
    request_mark_as_read: {
        type: Number,
    },
    notify_id:{
        type: Schema.Types.ObjectId,
        ref: "NotifyUserIfBatchAvailable",
    },

});

module.exports = mongoose.model("NotificationRequestBatch", notificationRequestBatchSchema);
