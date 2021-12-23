const mongoose = require("mongoose");

//Keyword field is taking from sql table coursekeywords type array
//recommended_courses field is taking from sql table coursecosinesimilaritytable type String 
//course_requirement field is taking from sql table courserequirements type Array
//course_target_audience_description field is taking from sql table coursetargetaudiencedetails type array
//student_learn_description field is taking from sql table whatwillstudentlearn type array


const coursesSchema = new mongoose.Schema({
    course_id: {
        type: String,
    },
    trainer_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    trainer_name: {
        type: String,
    },
    trainer_name_metaphone: {
        type: String,
    },
    course_image_path: {
        type :String,
    },
    course_title: {
        type: String,
    },
    course_title_metaphone: {
        type: String,
    },
    course_subtitle: {
        type: String,
    },
    course_subtitle_metaphone: {
        type: String,
    },
    currency: {
        type: String,
    },
    course_price: {
        type: Number,
    },
    course_description :{
        type: String,
    },
    course_welcome_message: {
        type: String,
    },
    course_completion_message: {
        type: String,
    },
    course_language: {
        type: String,
    },
    level_of_course: {
        type: String,
    },
    course_category: {
        type: String,
    },
    trainer_description: {
        type: String,
    },
    course_video_path: {
        type: String,
    },
    course_access_platform_name: {
        type: String,
    },
    course_access_platform_id: {
        type: Number,
    },
    course_status: {
        type: Number,
    },
    published_timestamp: {
        type: Date,
    },
    keyword: {
        type: Array,
    },
    recommended_courses: {
        type: String,
    },
    course_requirement: {
        type: Array,
    },
    course_target_audience_description: {
        type: Array,
    },
    student_learn_description :{
        type: Array,
    },
});

module.exports = mongoose.model('Courses', coursesSchema);
