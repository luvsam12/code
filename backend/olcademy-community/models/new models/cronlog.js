const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cronlogSchema = new mongoose.Schema({
    cron_log_id : {
        type : String
    },
    cron_filename : {
        type : String
    },
    cron_timestamp: {
        type : Date
    },
    cron_output : {
        type : String
    }
}) 

module.exports = mongoose.model("Cronlog" , cronlogSchema)