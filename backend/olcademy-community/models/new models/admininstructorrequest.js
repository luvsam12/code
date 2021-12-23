const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const admininstructorrequestSchema = new mongoose.Schema({
    instructor_request_id : {
       type : String
    },

    user_category : {
        type : String,
        required : true
    },

    adminStatus : {
        type : String,
        required : true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

})


module.exports = mongoose.Model("Admininstructorrequest" , admininstructorrequestSchema)