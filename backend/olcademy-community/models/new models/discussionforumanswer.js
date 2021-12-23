const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discussionforumanswerSchema = new mongoose.Schema({
   
    discussion_forum_answer_id : {
        type : String,
        required : true
    },
    answer_response : {
        type : String
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    response_timestamp : {
        type : Date
    },
    discussion_forum_question_id : {
        type: Schema.Types.ObjectId,
        ref: "Discussionforumquestions",
        required: true,
    },
    tag_id : {
        type : Number
    }
  

})

module.exports = mongoose.Model("Discussionforumanswer" , discussionforumanswerSchema)