const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseaccessSchema = new mongoose.Schema({
    user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    course_access_platform_name: {
        type: String,
    },
    platform_time_limit: {
        type: String,
    },
    platform_type: {
        type: String,
    },
    platform_image_path: {
        type: String,
    }
});

module.exports = mongoose.model("Courseacessplatform", courseaccessSchema);
