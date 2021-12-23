const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logindetailsSchema = new mongoose.Schema({
    login_details_id : {
        type : String
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    last_activity : {
        type : Date
    }
})

module.exports = mongoose.Model("Logindetails", logindetailsSchema  )