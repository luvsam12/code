const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const questionaskedbyhrSchema = new mongoose.Schema({
    question_asked_by_hr_id : {
        type : String
    },
    question_asked : {
        type : String
    },
    question_description: {
        type  : String
    } ,
    internship_id : {
        type: Schema.Types.ObjectId,
        ref: "Interndetails",
        required: true,
    },
    is_deleted_status : {
        type : Number
    },
    question_updated_timestamp : {
        type : Date
    }
})

module.exports = mongoose.Model("Questionaskedbyhr" , questionaskedbyhrSchema)