const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema(
  {
      question : {
          type : String
          
      },
      marks : {
        type : Number,
        default : 5
      },
      is_series_question : {
        type : Boolean  
      },
      category : {
        type : String,
        required : true
      },
      difficulty : {
        type : String,
        required : true
      },
      
      section : {
        type : String,
        required : true
      },
      media_query_files_question : {
        type : String
      },
      multiple_answers : {
        type : Boolean ,
        default : false 
      },
      user_id : {
        type:Schema.Types.ObjectId,
        ref:'User',  
      },
      media_query_files_answer : {
        type : Array
      },
      question_title : {
        type : String
      },
      answer_type : {
        type : String
      },
      answers : {
        type : Array
      },
      correct_answers : {
        type : Array
      },
      draft : {
        type : Boolean,
        default: false,
      } ,
      created_on : {
        type : Date,
        default : Date.now()
      },
      no_of_views: {
        type: Number,
        default: 0,
      },
      no_of_response: {
        type: Number,
        default: 0,
      },
      is_verified : {
        type : Boolean,
        default : false
      }
  }
);



module.exports = mongoose.model("Question" , questionSchema)