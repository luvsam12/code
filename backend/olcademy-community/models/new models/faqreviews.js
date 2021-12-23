const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const faqreviewsSchema = new mongoose.Schema({
    faq_reviews_id : {
        type : String,
        required : true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    faq_review : {
        type : String
    }
})

module.exports = mongoose.Model("Faqreviews" , faqreviewsSchema)