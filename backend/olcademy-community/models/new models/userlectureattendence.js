const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userlectureattendenceSchema = new mongoose.Schema({
  lecture_attendance_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
  course_section_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursesectiondetails",
    required: true,
  },
  attend_timestamp: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Userlectureattendence",
  userlectureattendenceSchema
);
