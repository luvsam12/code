const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const frequentlyaskedquestionsSchema = new mongoose.Schema({
    frequently_asked_questions_id : {
        type : String,
        required : true
    },
    frequently_asked_question : {
        type : String,
      
    },
    frequently_asked_questions_answers: {
        type : String,
    },
    frequently_asked_questions_topic : {
        type : String,
    }

})

module.exports = mongoose.Model("Frequentlyaskedquestions" , frequentlyaskedquestionsSchema)