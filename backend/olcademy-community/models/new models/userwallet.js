const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new mongoose.Schema({
    user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    user_wallet_amount_status: {
        type: Number,
    },
    wallet_timestamp: {
        type: Date
    }
});

module.exports = mongoose.model("Userwallet", walletSchema);
