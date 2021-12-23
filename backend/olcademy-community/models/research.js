const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  research_topic: {
    type: String,
    required: true,
  },
  publication_date: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Research", researchSchema);
