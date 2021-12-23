const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const internshipcertificationdetailsSchema = mongoose.Schema({

    internship_id : {
        type : String,
        required : true
    },
    internship_role_title : {
        type : String,
    },
    internship_category : {
        type : String
    },
    company_name : {
       type : String
    },
    location : {
        type : String
    },
    internship_type : {
        type : String
    },
    intership_start_date : {
       type : String ,
    },
    duration : {
        type : String
    },
    stipend : {
        type : String
    },
    posted_date : {
       type : Date
    },
    apply_by : {
        type : Date
    },
    about_internship : {
        type : String
    },
    no_of_interns_needed : {
        type : String
    },
    perks : {
        type : String
    },
    updated_on : {
        type : Date
    },
    is_deleted_status : {
        type : Number
    },
    is_approved_status : {
        type : Number
    },
    reasons_for_rejection : {
        type : String
    },
    internship_posted_count : {
        type : Number
    }
})

module.exports = mongoose.Model("Internshipcertificationdetails" , internshipcertificationdetailsSchema)