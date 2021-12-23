const mongoose = require("mongoose");
const Schema = Number.Schema;

const requestadminchangenameSchema = new mongoose.Schema({
  change_fullname_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  old_fullname: {
    type: String,
    required: true,
  },
  new_fullname: {
    type: String,
    required: true,
  },
  admin_status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Requestadminchangename",
  requestadminchangenameSchema
);
