const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discussionforumrepliesSchema = new mongoose.Schema({
    discussion_forum_replies_id : {
        type : String,
        required : true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reply_message : {
        type : String
    },
    discussion_forum_answer_id : {
        type: Schema.Types.ObjectId,
        ref: "Discussionforumanswer",
        required: true,
    },
    replied_time : {
        type : Date
    }
})

module.exports = mongoose.Model("Discussionforumreplies" , discussionforumrepliesSchema)