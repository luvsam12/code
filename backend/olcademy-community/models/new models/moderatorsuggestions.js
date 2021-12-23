const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moderatorsuggestionsSchema = new mongoose.Schema({
    moderator_suggestions_id : {
        type : String
    },
    course_id:{
        type: Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
    },
    course_image_path : {
        type : String
    },
    course_title : {
        type : String
    },
    course_subtitle : {
        type : String
    },
    course_description : {
        type : String
    },
    course_welcome_message : {
        type : String
    },
    course_completion_message : {
        type : String
    },
    basic_info : {
        type : String
    },
    trainer_description : {
        type : String
    },
    course_video_path : {
        type : String
    },
    course_price : {
        type : String
    },
    course_curriculum: {
        type : String
    },
    course_access_platform_link : {
        type : String
    } ,
    course_target_audience : {
        type : String
    },
    course_requirement : {
        type : String
    },
    student_learn_description : {
        type : String
    },
    is_modified : {
        type : Number
    },
    suggestion_cycle : {
        type : Number
    }
})

module.exports = mongoose.Model("Moderatorsuggestions" , moderatorsuggestionsSchema)

