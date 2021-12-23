const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discussionforumquestionsSchema = new mongoose.Schema({
    discussion_forum_question_id : {
        type : String,
        required : true
    },
    discussion_forum_question : {
        type : String
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    question_asked_timestamp : {
        type : Date
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
      }
   
})

module.exports = mongoose.Model("Discussionforumquestions" , discussionforumquestionsSchema)