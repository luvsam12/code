const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discussionforumanswerreviewSchema = new mongoose.Schema({
    answer_review_id : {
        type : String,
        required : true
    },
    discussion_forum_answer_id : {
        type: Schema.Types.ObjectId,
        ref: "Discussionforumanswer",
        required: true,
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    like_or_dislike : {
        type : String
    }
})


module.exports = mongoose.Model("Discussionforumanswerreview" , discussionforumanswerreviewSchema)