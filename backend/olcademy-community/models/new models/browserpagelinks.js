const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const browserpagelinksSchema = new mongoose.Schema({
    browser_pagelinks_id : {
        type : String
    } ,
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    browser_name :{
        type : String
    },
    current_page_link : {
        type : String
    },
    previous_page_link : {
        type : String
    },
    user_session_id : {
        type : String
    },
    page_visit_timestamp : {
        type : Date
    }
})

module.exports = mongoose.Model("Browserpagelinks" , browserpagelinksSchema)