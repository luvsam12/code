const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantcertificatesSchema = new mongoose.Schema({
  intern_certificate_id: {
    type: String,
    required: true,
  },
  applicant_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  internship_role_title: {
    type: String,
    required: true,
  },
  internship_category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Applicantcertificates",
  applicantcertificatesSchema
);
