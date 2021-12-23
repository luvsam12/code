const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const emailVerificationSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    user_id: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true,
    }
});

module.exports = mongoose.model("EmailVerification", emailVerificationSchema);
