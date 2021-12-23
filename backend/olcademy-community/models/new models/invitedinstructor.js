const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invitedinstructorSchema = new mongoose.Schema({
  invited_instructor_id: {
    type: String,
    required: true,
  },
  inviter_user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_email_id: {
    type: String,
    required: true,
  },
  invite_accepted: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Invitedinstructor", invitedinstructorSchema);
