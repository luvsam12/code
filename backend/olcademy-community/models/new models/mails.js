const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mailsSchema = new mongoose.Schema({
    mail_id : {
        type : String
    },
    mail_type: {
        type : String
    },
    mail_priority: {
        type : String
    },
    mail_receivers: {
        type : String
    },
    mail_sentby: {
        type : String
    },
    mail_subject: {
        type : String
    },
    mail_body : {
        type : String
    },
    mail_attachments : {
        type : String
    },
    timestamp: {
        type : Date
    },
    attempts: {
        type : Number
    }

})

module.exports = mongoose.model("Mails" , mailsSchema)