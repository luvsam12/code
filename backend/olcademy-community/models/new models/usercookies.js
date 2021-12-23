const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usercookiesSchema = new mongoose.Schema({
  user_cookie_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cookie_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Usercookies", usercookiesSchema);
