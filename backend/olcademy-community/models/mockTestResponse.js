const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const MockTestResponse = new mongoose.Schema({
    user_id : {
        type:Schema.Types.ObjectId,
        ref:'User',  
    },
    test_name : {
        type : String,
    },
    submitted_on :{
        type : Date,
        default : Date.now(),
    },
    no_of_questions : {
        type : Number,
        default : 0,
    },
    no_of_questions_attempted : {
        type : Number,
        default : 0,
    },
    mock_test_time_limit : {
        type : Number,
        default : 0,
    },
    mock_test_time_taken : {
        type : Number,
        default : 0,
    },
    score_of_mock_test : {
       type : Number,
       default : 0,
    },
    score_of_user_mock_test : {
        type : Number,
        default : 0,
     },
    response : {
        question_id : {
            type:Schema.Types.ObjectId,
            ref: 'Question'
        },
        user_answer: {
            type: Array,
        },
        correct_answer: {
            type: Array,
        }
    },
    mock_test_id : {
        type:Schema.Types.ObjectId,
        ref : 'MockTest'
    },
    percentile: {
        type: Number,
        default: 0,
    }   
})

module.exports = mongoose.model('MockTestResponse' , MockTestResponse)