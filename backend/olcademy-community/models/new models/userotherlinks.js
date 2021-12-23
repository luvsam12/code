const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userotherlinksSchema = new mongoose.Schema({
  user_other_link_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_links: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Userotherlinks", userotherlinksSchema);
