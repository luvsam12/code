const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminwalletwithdrawrequestSchema = new mongoose.Schema({
    admin_wallet_withdraw_request_id : {
        type : String
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    withdraw_amount : {
        type : Number
    },
    request_status : {
        type : String
    },
    timestamp : {
        type : Date
    }
})


module.exports = mongoose.Model("Adminwalletwithdrawrequest" , adminwalletwithdrawrequestSchema)