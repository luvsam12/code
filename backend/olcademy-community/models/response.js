const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new mongoose.Schema({
    question_id : {
        type:Schema.Types.ObjectId,
        ref:'Question',
        required : true
    },
    user_id : {
        type:Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    user_name :{
        type : String
    },
    time_of_comment : {
        type : Date, 
        default : Date.now()
    },
    media_link : {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    text_response: {
        text: {
            type: String,
        },
    },
    no_of_answered : {
    type : Object
    },
    no_of_likes: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model("Response" , responseSchema);