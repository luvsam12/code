const express = require("express");
const router = express.Router();
// const auth = require('../middleware/auth')
const auth = require("../middleware/auth");

// const { createQuestions , uploadQuestionPhoto, testcategory, postresponse, filterQuestions, getresponse, getmyuploads } = require('../controllers/test');
// const { createQuestions , uploadQuestionPhoto, testcategory, pagingtestcategory, postresponse, filterQuestions, getresponse, getmyuploads , getQuestions} = require('../controllers/test');

// const { createQuestions , uploadQuestionPhoto, testcategory, pagingTestCategory, postResponse, filterQuestions, getResponse, getMyUploads, pagingGetResponse, pagingGetMyUploads , getQuestionsForModerator , createMockTest} = require('../controllers/test');
// const { storage, upload, uploadImages, uploadAudio } = require("../config/postfileuploads");
// const auth = require("../middleware/auth");

const {
  createQuestions,
  practiceQuestion,
  pagingPracticeQuestion,
  postResponse,
  getResponse,
  getMyUploads,
  pagingGetResponse,
  pagingGetMyUploads,
  likeResponse,
  increaseViewQuestion,
  myAttempt,
  getQuestionsForModerator,
  createMockTest,
  getMockTest,
  submitMockTest,
  myAttemptPractice,
  getMockTestReport,
  myAttemptMockTest,
} = require("../controllers/test");

const { upload } = require("../config/postfileuploads");

// Routes

router.post(
  "/postQuestion",
  auth,
  upload.array("media_query_files_question"),
  createQuestions
);

router.get("/practiceQuestion", auth, practiceQuestion);

router.get("/pagingPracticeQuestion", auth, pagingPracticeQuestion);

router.post("/postResponse", auth, upload.array("media"), postResponse);

router.get("/getResponse", auth, getResponse);

router.get("/pagingGetResponse", auth, pagingGetResponse);

router.get("/getMyUploads", auth, getMyUploads);

router.get("/getQuestions", auth, getQuestionsForModerator);

router.get("/pagingGetResponse", auth, pagingGetResponse);

router.get("/pagingGetMyUploads", auth, pagingGetMyUploads);

router.put("/likeResponse/:id", auth, likeResponse);

router.get("/getQuestions", auth, getQuestionsForModerator);

router.put("/increaseViewQuestion/:id", auth, increaseViewQuestion);

router.get("/myAttempt", auth, myAttempt);

router.post("/createMockTest", auth, createMockTest);

router.get("/myAttemptPractice", auth, myAttemptPractice);

router.get("/getMockTest/:category", auth, getMockTest);

router.post("/submitMockTest/:mockTestId", auth, submitMockTest);

router.get("/report/:mockTestId", auth, getMockTestReport);

router.get('/myAttemptMockTest', auth, myAttemptMockTest);

module.exports = router;
