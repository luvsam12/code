const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatsessiondetailsSchema = new mongoose.Schema({
  chat_session_id: {
    type: String,
    required: true,
  },
  message_sender_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message_receiver_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message_receiver_category: {
    type: String,
    required: true,
  },
  last_message_id: {
    type: Schema.Types.ObjectId,
    ref: "Chatmessages",
    required: true,
  },
  is_blocked_status: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Chatsessiondetails", chatsessiondetailsSchema);
