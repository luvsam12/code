const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const internshipcreationdetailsSchema = new mongoose.Schema({
    internship_id : {
        type : String
    },
    internship_role_title : {
        type : String
    },
    internship_category : {
        type : String
    },
    company_name : {
        type : String
    },
    location: {
        type : String
    },
    internship_type : {
        type : String
    },
    internship_start_date : {
        type : Date
    },
    duration: {
        type : String
    },
    stipend : {
        type : String
    },
    posted_date : {
        type : Date
    },
    apply_by: {
        type : Date
    },
    about_internship: {
        type : String
    },
    no_of_interns_needed : {
        type : Number
    },
    perks: {
        type : String
    },
    updated_on: {
        type : String
    },
    is_deleted_status: {
        type : Number
    },
    is_approved_status: {
        type : Number
    },
    reasons_for_rejection : {
        type : String
    },
    internship_posted_count: {
        type : Number
    }
    
})

module.exports = mongoose.model("Internshipcreationdetails" , internshipcreationdetailsSchema )