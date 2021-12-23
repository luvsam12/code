const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const notifysuscribeduserSchema = new mongoose.Schema({
    subscribe_user_id : {
        type : Number
    },
    subscribe_user_email : {
        type : String,
        required : true
    }
})

module.exports = mongoose.Model("Notifysuscribeduser" , notifysuscribeduserSchema)