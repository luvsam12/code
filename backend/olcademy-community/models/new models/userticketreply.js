const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userticketreplySchema = new mongoose.Schema({
    user_ticket_reply_id : {
        type : Number
    },
    user_ticket_id : {
        type: Schema.Types.ObjectId,
        ref: "Userticket",
        required: true,
    },
    admin_id : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    user_ticket_reply:{
        type : String,
        required: true
    },
    user_ticket_reply_timestamp : {
        type : Date,
    
    }

})

module.exports = mongoose.Model("Userticketreply" , userticketreplySchema )