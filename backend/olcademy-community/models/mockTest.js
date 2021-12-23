const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mockTestSchema = new mongoose.Schema({
    question_ids : [
        {
          type:Schema.Types.ObjectId,
          ref:'Question',
        }
    ],
    time : {
        type : Date,
        default : Date.now()
    },
    no_of_questions : {
        type : Number,
        default : 0
    },
    test_name : {
        type : String
    },
    mock_test_category : {
        type : String
    },
    mock_test_time_limit : {
        type : String,
    },
    score_of_mock_test : {
       type : Number
    }
})

module.exports = mongoose.model("MockTest", mockTestSchema)