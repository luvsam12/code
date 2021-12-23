const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseapprovaldetailsSchema = new mongoose.Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
    },
    moderator_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    details_updated_timestamp: {
        type: Date,
    },
    is_approved_status: {
        type: Number,
    },
    suggestions_file_path: {
        type: String,
    },
});

module.exports = mongoose.model("Courseapproval", courseapprovaldetailsSchema);
