const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const temporarybuydetailsSchema = new mongoose.Schema({
    temporary_buy_details_id : {
        type : String
    } ,
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
      },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    transaction_secret_key : {
          type : String
      },
    coupon_applied : {
        type : String
    },
    coupon_type: {
        type : String
    },
    is_successfull : {
        type : String
    },
    course_batch_id: {
        type: Schema.Types.ObjectId,
        ref: "Coursebatch",
        required: true,
    }

})

module.exports = mongoose.Model("Temporarybuydetails" , temporarybuydetailsSchema)