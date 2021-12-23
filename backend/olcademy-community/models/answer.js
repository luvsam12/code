const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
   question_id : {
     type:Schema.Types.ObjectId,
     ref:'Questions'
     
   },

   answer_type : {
      type : String
   },

   correct_answers : {
       type : Array
   }
})

module.exports = mongoose.model("Answer" , answerSchema)