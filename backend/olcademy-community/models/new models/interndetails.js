const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const interndetailsSchema = new mongoose.Schema({
    intern_id : {
        type : String,
        required : true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date_of_join :{
        type : Date
    },
    end_date : {
        type : Date
    },
    no_of_leaves : {
        type : Number
    },
    domain : {
        type : String
    },
    lead_name : {
        type : String
    },
    contact : {
        type : Number
    },
    resume : {
        type : String
    },
    is_certificate_created : {
        type : Number
    }
})

module.exports = mongoose.Model("Interndetails" , interndetailsSchema)