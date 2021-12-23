const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const passwordrecoveryuniqueidSchema = new mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    unique_id : {
        type : String
    },
    unique_id_created_timestamp : {
        type : Date
    },
    password_recovery_unique_id : {
        type : String
    } 
})

module.exports = mongoose.Model("Passwordrecoveryuniqueid" , passwordrecoveryuniqueidSchema)