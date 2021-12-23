const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    icon: {
      type: String,
      default: null,
    },
    bg_color:{
        type: String,
      }
  },
);

module.exports = mongoose.model("TestCategory", testSchema, 'testcategories');
