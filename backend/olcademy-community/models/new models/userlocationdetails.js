const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userlocationdetailsSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_city: {
    type: String,
  },
  user_region_name: {
    type: String,
  },
  user_country: {
    type: String,
  },
  user_longitude: {
    type: Number,
  },
  user_latitude: {
    type: Number,
  },
  user_IP_Address: {
    type: String,
  },
});

module.exports = mongoose.model(
  "userlocationdetails",
  userlocationdetailsSchema
);
