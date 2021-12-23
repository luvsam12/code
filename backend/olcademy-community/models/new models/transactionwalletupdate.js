const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionwalletupdateSchema = new mongoose.Schema({
    wallet_transfer_id : {
        type : String
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
      },
    course_batch_id: {
        type: Schema.Types.ObjectId,
        ref: "Coursebatch",
        required: true,
    },
    transaction_id : {
        type : String
    },
    amount_transferred : {
        type : String
    } ,
    transaction_timestamp : {
        type : Date
    }
})

module.exports = mongoose.Model("Transactionwalletupdate" , transactionwalletupdateSchema)

