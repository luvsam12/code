const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interncertificateSchema = new mongoose.Schema({
    intern_certificate_id : {
        type : Number
    },
    applicant_id : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    internship_role_title : {
        type : String
    },
    internship_category : {
        type : String
    }
})

module.exports = mongoose.Model("Interncertificate" , interncertificateSchema )