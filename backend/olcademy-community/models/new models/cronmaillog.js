const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cronmaillogSchema = new mongoose.Schema({
    cron_mail_log_id : {
        type : String
    },
    cron_mail_receiver : {
        type : String
    },
    cron_mail_sender: {
        type : String
    },
    cron_mail_status : {
        type : Number
    },
    cron_mail_error : {
        type : String
    },
    cron_mail_type: {
        type : Number
    },
    cron_mail_timestamp : {
        type : String
    }
})

module.exports = mongoose.model("Cronmaillog" , cronmaillogSchema)