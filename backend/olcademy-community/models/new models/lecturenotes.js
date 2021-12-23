const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lectureNotesSchema = new mongoose.Schema({
  lecture_note_id: {
    type: String,
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
  document_path: {
    type: String,
    required: true,
  },
  lecture_notes_timestamp: {
    type: String,
  },
});

module.exports = mongoose.model("LectureNotes", lectureNotesSchema);
