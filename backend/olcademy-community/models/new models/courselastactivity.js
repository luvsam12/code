const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursecheckoutdetailsSchema = new mongoose.Schema({
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
    last_activity: {
        type: Date,
    },
    course_random_number: {
        type: Number,
    },
});

module.exports = mongoose.model("Coursecheckout", coursecheckoutdetailsSchema);
