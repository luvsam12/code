const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const internshipcategorySchema = new mongoose.Schema({
    internship_category_id : {
        type : String,
        required : true
    },
    title : {
        type : String
    },
    updated_timestamp : {
        type : Date
    },
    is_deleted_status : {
        type : String
    }

})

module.exports = mongoose.Model("Internshipcategory" , internshipcategorySchema)