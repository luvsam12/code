const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificatesSchema = new mongoose.Schema({
    certificate_id_number:{
        type: String,
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Courses",  
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    certificate_path_name:{
        type: String,
    }
});

module.exports = mongoose.model("Certificates", certificatesSchema);
