const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const historyofpublisheddateSchema = new mongoose.Schema({

    history_of_published_date_id : {
        type : String,
        required : true
    } ,
    course_id: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
      },
      published_or_republished_date : {
          type : Date
      }

})

module.exports = mongoose.Model("Historyofpublisheddate" , historyofpublisheddateSchema)