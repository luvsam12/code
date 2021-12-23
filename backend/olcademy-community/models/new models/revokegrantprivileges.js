const mongoose = require("mongoose");
const Schema = Number.Schema;

const revokegrantprivilegesSchema = new mongoose.Schema({
  access_privilege_id: {
    type: String,
    required: true,
  },
  access_privilege_time: {
    type: Date,
    required: true,
  },
  admin_action: {
    type: String,
    required: true,
  },
  user_role: {
    type: String,
    required: true,
  },
  reason_for_grant_revoke_privilege: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model(
  "Revokegrantprivileges",
  revokegrantprivilegesSchema
);
