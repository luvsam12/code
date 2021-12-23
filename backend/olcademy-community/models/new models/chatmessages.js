const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatmessagesSchema = new mongoose.Schema({
    chat_message_id: {
        type: Number,
    },
    chat_session_id: {
        type: String,
    },
    chat_message: {
        type: String,
    },
    is_read_status: {
        type: Number,
    },
    is_deleted_status: {
        type: Number,
    },
    message_timestamp: {
        type: Date,
    },
    message_type: {
        type: String,
    },
});

module.exports = mongoose.model("Chatmessages", chatmessagesSchema);

