const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursemediadetailsSchema = new mongoose.Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
    },
    encrypted_file_name: {
        type: String,
    },
    actual_file_name: {
        type: String,
    },
    media_category: {
        type: String,
    }
});

module.exports = mongoose.model("Coursemediadetails", coursemediadetailsSchema);
