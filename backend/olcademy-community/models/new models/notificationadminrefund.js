const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationadminrefundSchema = new mongoose.Schema({
    notification_admin_id:{
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
    course_batch_id:{
        type: Schema.Types.ObjectId,
        ref: "Coursebatch",
        required: true,
    },
    unique_key:{
        type: String,
    },
    notification_accepted_buy_text:{
        type: String,
    },
    notification_accepted_mark_as_read:{
        type: Number,
    }
});

module.exports = mongoose.model("Notificationadminrefund", notificationadminrefundSchema);
