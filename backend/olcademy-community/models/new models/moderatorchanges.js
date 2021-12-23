const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const moderatorchangesSchema = new mongoose.Schema({
    moderator_changes_id : {
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
    course_category : {
        type : String
    },
    trainer_description : {
        type : String
    } ,
    course_video_path : {
        type : String
    },
    course_target_audience : {
        type : String
    },
    course_requirement : {
        type : String
    },
    student_learn_description : {
        type  : String
    },
    changes_index: {
        type : String
    }
})


module.exports = mongoose.Model("Moderatorchanges" , moderatorchangesSchema)