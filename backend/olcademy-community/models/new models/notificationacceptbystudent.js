const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationacceptSchema = new mongoose.Schema({
    notification_accept_buy_id:{
        type: String,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Courses",  
        required: true,
    },
    course_batch_id:{
        type: Schema.Types.ObjectId,
        ref: "Coursebatch",
        required: true,
    },
    unique_key:{
        type: String,
    },
    notification_accept_buy_text:{
        type: String,
    },
    notification_accept_mark_as_read:{
        type: Number,
    }
});

module.exports = mongoose.model("Notificationaccept", notificationacceptSchema);
