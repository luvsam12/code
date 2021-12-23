const mongoose = require("mongoose");
const { stringify } = require("uuid");

const Schema = mongoose.Schema;

const internshipapplicantdetailsSchema = new mongoose.Schema({

    internship_applicant_details_id : {
        type : String,
        required : true
    },
    internship_applicant_name : {
        type : String,
    },
    internship_applicant_photo : {
        type : String
    },
    skills : {
        type : String
    },
    resume : {
        type : String
    },
    location : {
        type : String
    },
    college : {
        type : String
    },
    internship_applicant_email : {
        type : String
    },
    degree : {
        type : String
    },
    applied_category : {
        type : String
    },
    work_sample : {
        type : String
    },
    applied_date : {
        type : Date
    },
    internship_id : {
        type: Schema.Types.ObjectId,
        ref: "Interndetails",
        required: true,
    },
    status_of_application : {
        type : String
    },
    is_intern_selected : {
        type : String
    },
    reasons_for_rejection : {
        type : String
    },
    is_offer_letter_issued : {
        type : Number
    },
    is_internship_certificate_issued : {
        type : Number
    },
    is_lor_issued : {
        type : Number
    },
    is_ppo_issued : {
        type : Number
    },
    champion : {
        type : String
    },
    date_hired_on : {
        type : Date
    }

})

module.exports = mongoose.Model("Internshipapplicantdetails" , internshipapplicantdetailsSchema)