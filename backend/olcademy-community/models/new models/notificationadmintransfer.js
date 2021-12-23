const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationadmintransferSchema = new mongoose.Schema({
    notification_admin_transfer_id:{
        type: Number,
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    unique_key:{
        type: String,
    },
    notification_transfer_text:{
        type: String,
    },
    notification_transfer_mark_as_read:{
        type: Number,
    }
});

module.exports = mongoose.model("Notificationadmintransfer", notificationadmintransferSchema);
