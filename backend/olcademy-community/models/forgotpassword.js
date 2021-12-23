const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const forgotPasswordSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    user_id: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '5m' },
    },
});

module.exports = mongoose.model("forgotpassword", forgotPasswordSchema);
