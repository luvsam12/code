const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatfiledetailsSchema = new mongoose.Schema({
  chat_file_details_id: {
    type: Number,
    required: true,
  },
  chat_message_id: {
    type: Schema.Types.ObjectId,
    ref: "Chatmessages",
    required: true,
  },
  file_location_path: {
    type: String,
  },
  file_type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("chatfiledetails", chatfiledetailsSchema);