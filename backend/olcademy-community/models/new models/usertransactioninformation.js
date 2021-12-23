const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const usertransactionnformationSchema = new mongoose.Schema({
    user_transaction_information_id : {
        type : Number
    },
    user_id : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    generated_transaction_id : {
        type : String
    },
    amount_transferred : {
        type : Number
    },
    course_section_id: {
        type: Schema.Types.ObjectId,
        ref: "Coursesectiondetails",
        required: true,
      },
      course_batch_id: {
        type: Schema.Types.ObjectId,
        ref: "Coursebatch",
        required: true,
      },
      course_id: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
      },
      transaction_timestamp : {
          type : Date , 
          
      }
})

module.exports = mongoose.Model("Userransactionnformation" , usertransactionnformationSchema)