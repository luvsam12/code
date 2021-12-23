const mongoose = require("mongoose");
const Schema = Number.Schema;

const secrethashSchema = new mongoose.Schema({
  stamp_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  secret_key_for_transaction: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Secrethash", secrethashSchema);
