const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const myvotesSchema = new mongoose.Schema({
    id : {
        type : String
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    answer_id : {
        type : String,
    },
    vote: {
        type : String
    },
    timestamp: {
        type : Date
    }
})

module.exports = mongoose.Model("Myvotes" , myvotesSchema)