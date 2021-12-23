const mongoose = require("mongoose");
const Schema = Number.Schema;

const searchtermtableSchema = new mongoose.Schema({
  search_term_table_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  search_term: {
    type: String,
    required: true,
  },
  searched_timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Searchtermtable", searchtermtableSchema);
