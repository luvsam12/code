const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userticketSchema = new mongoose.Schema({
    user_ticket_id : {
        type : Number
    },
    ticket_id : {
        type : String,
        required : true
    },
    user_email_id : {
        type : String,
        required : true
    },
    user_category : {
        type : String,
        required : true
    },
    issue_category   : {
        type : String,
        required : true
    },
    issue_subcategory : {
        type : String,
        required : true
    },
    issue_description : {
        type : String,
        required : true
    },
    issue_attachment : {
        type : String,
        required : true
    },
    ticket_status : {
        type : String,
        required : true
    },
    ticket_timestamp : {
        type : Date,
        
    }

})

module.exports = mongoose.Model("Userticket" , userticketSchema )