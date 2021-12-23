const mongoose = require('mongoose')

const Schema  = mongoose.Schema;


const notificationinstructortransferSchema = new mongoose.Schema({
    unique_key : {
        type : String
      },
    notification_instructor_transfer_id : {
        type : Number
    },
    user_id : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    notification_transfer_text  : {
        type : String,
        required : true
    },
    notification_transfer_mark_as_read  : {
        type : Number,
        required : true   
    }
})

module.exports = mongoose.Model("Notificationinstructortransfer" , notificationinstructortransferSchema )