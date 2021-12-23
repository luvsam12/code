const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userwalletcommissionSchema = new mongoose.Schema({
  user_wallet_commission_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  commission_amount: {
    type: String,
  },
  total_amount_recieved: {
    type: String,
  },
  retaining_amount: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Userwalletcommission",
  userwalletcommissionSchema
);
