const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const userTestDetailsSchema = new mongoose.Schema({
    user_id : {
        type:Schema.Types.ObjectId,
        ref:'User',  
    },
    number_of_mock_tests : {
        type : Number,
        default: 0,
    },
    avg_score_mock_test : {
        type : Number,
        default: 0,
    },
    number_of_practice_question : {
        type : Number,
        default: 0,
    },
    avg_score_practice_question : {
        type : Number,
        default: 0,
    },
    total_marks_in_practice_questions : {
       type : Number,
       default : 0
     },
    avg_mock_percentile : {
        type : Number,
        default: 0,
    },
    avg : {
        type : Number,
        default: 0,
    },
    avg_mock_accuracy : {
        type : Number,
        default: 0,
    },
    current_percentage_practice : {
        type : Number,
        default: 0,
    },
    incurrent_percentage_practice : {
        type : Number,
        default: 0,
    },
    avg_accuracy_practice : {
        type : Number,
        default: 0,
    },
    question_attempted_practice : [
        {
            type:Schema.Types.ObjectId,
            ref:'Question',
        }
    ],
    mock_attempted : [
        {
            type:Schema.Types.ObjectId,
            ref:'MockTest',
        }
    ]
})

module.exports = mongoose.model("UserTestDetails", userTestDetailsSchema)