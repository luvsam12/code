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
    course_batch_id: {
        type: Schema.Types.ObjectId,
        ref: "Coursebatch",
        required: true,
    },
});

module.exports = mongoose.model("Coursecheckout", coursecheckoutdetailsSchema);
