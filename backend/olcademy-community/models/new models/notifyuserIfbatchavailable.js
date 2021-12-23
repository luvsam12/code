const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const notifyuserIfbatchavailableSchema = new mongoose.Schema({
    notify_id : {
        type : Number
    },
    user_id : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course_id : {
        type : Schema.Types.ObjectId,
        ref : "Courses",
        required : true
    },
    available_batch_day:{
        type : String,
        required : true
    },
    in_morning : {
        type : Number,
        required : true
    },
    in_afternoon : {
        type : Number,
        required : true
    },
    in_evening : {
        type : Number , 
        required : true
    },
    requested_batch_date : {
        type : Date,
        required : true
    }
})

module.exports = mongoose.Model("NotifyuserIfbatchavailable" , notifyuserIfbatchavailableSchema )