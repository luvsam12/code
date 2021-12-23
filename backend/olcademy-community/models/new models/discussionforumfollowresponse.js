const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  discussionforumfollowresponseSchema = new mongoose.Schema({
    follow_responses_id : {
        type : Number
    },
    discussion_forum_question_id : {
        type: Schema.Types.ObjectId,
        ref: "Discussionforumquestions",
        required: true,
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})

module.exports = mongoose.Model("Discussionforumfollowresponse" , discussionforumfollowresponseSchema)