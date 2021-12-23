const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const seriesQuestionSchema = new mongoose.Schema({
   series_information : {
       type : String,
       maxlength : 1000
   },
   category : {
    type : String,
    required : true
  },
  difficulty : {
    type : String,
    required : true
  },

  questions_based_on_series : [
    Object
  ],
  
  section : {
    type : String,
    required : true
  },
  mediaQueryFilesQuestion : {
    type : String
  },
   question_ids :{
     type : Array
   }
})

module.exports = mongoose.model("SeriesQuestion" , seriesQuestionSchema);