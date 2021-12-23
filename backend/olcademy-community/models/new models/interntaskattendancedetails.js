const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const interntaskattendancedetailsSchema = new mongoose.Schema({
    intern_task_attendance_details_id : {
        type : String
    },
    internship_applicant_details_id : {
       
            type: Schema.Types.ObjectId,
            ref: "Interndetails",
            required: true,
      
    },
    date : {
        type : Date
    },
    task_assigned : {
        type : String
    },
    task_performed : {
        type : String
    },
    is_present_status : {
        type : Number
    }
})



module.exports = mongoose.Model("Interntaskattendancedetails", interntaskattendancedetailsSchema )
