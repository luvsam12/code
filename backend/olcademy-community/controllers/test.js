const Answer = require("./../models/answer");
const Question = require("../models/questions");
const UserTestDetails = require("../models/usertestdetails");
const SeriesQuestion = require("../models/seriesQuestions");
const Response = require("../models/response");
const User = require("../models/user");
const MockTest = require("./../models/mockTest");
const MockTestResponse = require("../models/mockTestResponse");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dxvc9qd2g",
  api_key: "765672581547499",
  api_secret: "cbU_DCL9fDVy6K-ymkaW2EfnCHA",
});

const fs = require("fs");
const response = require("../models/response");
const user = require("../models/user");
const { findOne } = require("./../models/answer");

// function for calculating avg of practice question attempted by user (response can be array of multiple answers or string)
const calAvg = async (question_id, user_id, response) => {
  await Answer.find({ question_id: question_id })
    .then(async (answer) => {
      if (answer[0].answer_type === "textResponse") {
        await UserTestDetails.find({ user_id: user_id }).then(async (user) => {
          // console.log(user)
          let number_of_practice_questions =
            user[0].number_of_practice_question;
          let averageOfPracticeQuestion = user[0].avg_score_practice_question;

          let total_marks_in_practice_questions =
            user[0].total_marks_in_practice_questions;

          if (
            response.toLowerCase() ===
            answer[0].correct_answers[0].toLowerCase()
          ) {
            number_of_practice_questions += 1;
            total_marks_in_practice_questions += 5;
            averageOfPracticeQuestion =
              total_marks_in_practice_questions / number_of_practice_questions;
            averageOfPracticeQuestion = averageOfPracticeQuestion.toFixed(2);
          } else {
            number_of_practice_questions += 1;
            averageOfPracticeQuestion =
              total_marks_in_practice_questions / number_of_practice_questions;
            averageOfPracticeQuestion = averageOfPracticeQuestion.toFixed(2);
          }

          await UserTestDetails.updateOne(
            { user_id: user_id },
            {
              $set: {
                number_of_practice_question: number_of_practice_questions,
                avg_score_practice_question: averageOfPracticeQuestion,
                total_marks_in_practice_questions: total_marks_in_practice_questions,
              },
            },
            {
              $push: { question_attempted_practice: question_id },
            },
            { new: true }
          )
            .then((user) => {
              // console.log("user: ",user);
              return true;
            })
            .catch((err) => {
              console.log(err, "Cannot update user test details");
              throw Error(err);
            });
        });
      } else if (answer[0].answer_type === "mcq") {
        await UserTestDetails.find({ user_id: user_id }).then(async (user) => {
          let number_of_practice_questions =
            user[0].number_of_practice_question;
          let averageOfPracticeQuestion = user[0].avg_score_practice_question;
          let total_marks_in_practice_questions =
            user[0].total_marks_in_practice_questions;
          let flag = true;
          if (answer[0].correct_answers.length !== response.length) {
            flag = false;
          } else {
            for (let i = 0; i < answer[0].correct_answers.length; i++) {
              if (!answer[0].correct_answers.includes(response[i])) {
                flag = false;
              }
            }
          }

          if (flag) {
            number_of_practice_questions += 1;
            total_marks_in_practice_questions += 5;
            averageOfPracticeQuestion =
              total_marks_in_practice_questions / number_of_practice_questions;
            averageOfPracticeQuestion = averageOfPracticeQuestion.toFixed(2);
          } else {
            number_of_practice_questions += 1;
            averageOfPracticeQuestion =
              total_marks_in_practice_questions / number_of_practice_questions;
            averageOfPracticeQuestion = averageOfPracticeQuestion.toFixed(2);
          }

          await UserTestDetails.updateOne(
            { user_id: user_id },
            {
              $set: {
                number_of_practice_question: number_of_practice_questions,
                avg_score_practice_question: averageOfPracticeQuestion,
                total_marks_in_practice_questions: total_marks_in_practice_questions,
              },
            },
            {
              $push: { question_attempted_practice: question_id },
            },

            { new: true }
          )
            .then((user) => {
              // console.log(user)
              return true;
            })
            .catch((err) => {
              console.log(err, "Cannot update user test details");
              throw Error(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log("No ANswer Exists");
      throw Error(err);
    });
};

exports.createQuestions = async (req, res) => {
  // console.log(req.files)

  // console.log(req.body)
  if (req.body.is_series_question === false) {
    console.log(req.body);
    const correct_answers = req.body.correct_answers;
    const question = new Question(req.body);
    question.question = req.body.question.toLowerCase();
    question.user_id = req.user.user_id;
    if (req.body.correct_answers.length > 1) {
      question.multiple_answers = true;
    }
    question.correct_answers = null;
    // question.mediaQueryFilesQuestion = req.arrayOfUrlAndIds
    question
      .save()
      .then((question) => {
        console.log(question);
        const answer = new Answer({
          question_id: question._id,
          answer_type: question.answer_type,
          correct_answers: correct_answers,
        });

        answer
          .save()
          .then(() => {
            res.status(200).json({ msg: "success", question, answer });
          })
          .catch((err) => {
            res.status(400).json({ msg: "cannot save answer", err });
          });
      })
      .catch((err) => {
        res.status(400).json({ msg: "cannot post question", err });
      });
  } else if (req.body.is_series_question === true) {
    const series_question = new SeriesQuestion(req.body);
    console.log(series_question);
    let question_ids = series_question.questions_based_on_series.map(
      async (el) => {
        let question = new Question(el);
        question.category = req.body.category;
        question.section = req.body.section;
        question.difficulty = req.body.difficulty;
        question.user_id = req.user.user_id;
        if (question.correct_answers.length > 1) {
          question.multiple_answers = true;
        }
        await question.save();
        const answer = new Answer({
          question_id: question._id,
          answer_type: question.answer_type,
          correct_answers: question.correct_answers,
        });
        answer.save();
        console.log(answer);
        return question._id;
      }
    );

    series_question.questions_based_on_series = null;

    const ids = await Promise.all(question_ids);
    ids.map((el) => {
      series_question.question_ids.push(el);
    });

    console.log(series_question);
    series_question.save();
    res.status(200).json({
      success: "true",
      series_question,
    });
  }
};

exports.filterQuestions = async (req, res) => {
  const filterObj = { ...req.query };
  const excludeFields = ["sortBy"];
  excludeFields.forEach((el) => delete filterObj[el]);
  console.log(filterObj);
  if (req.query.difficulty === "allLevels") {
    delete filterObj["difficulty"];
  }
  console.log(filterObj);
  let query = Question.find(filterObj);
  if (req.query.sortBy === "oldest") {
    query = query.sort("created_on");
  } else {
    query = query.sort("-created_on");
  }

  const questions = await query;

  res.status(200).json({
    length: questions.length,
    questions: questions,
  });
};

// get categorie wise practice question
exports.practiceQuestion = async (req, res) => {
  var attempted_id = [""],
    question = [];
  try {
    await UserTestDetails.find({ user_id: req.user.user_id })
      .then((testDetail) => {
        attempted_id = testDetail[0].question_attempted_practice;
      })
      .catch((err) => {
        console.log("Error in User: ", err.message);
        res.status(400).json({
          success: false,
          msg: "ERR IN User Test",
        });
      });
    let query = {};
    console.log(attempted_id);
    if (req.query.category) {
      query["category"] = {
        $in: req.query.category,
      };
    }
    if (req.query.section) {
      query["section"] = {
        $in: req.query.section,
      };
    }
    if (req.query.difficulty) {
      query["difficulty"] = {
        $in: req.query.difficulty,
      };
    }
    await Question.find(query)
      .sort("-created_on")
      .then(async (questions) => {
        var count = 0,
          non_attempted_question_ids = [],
          non_attempted_question = [],
          result = {};
        question = questions.map((quest) => {
          if (count < 10) {
            count += 1;
            if (!attempted_id.includes(quest._id)) {
              result = {
                category: quest.category,
                question: quest.question,
                media_query_files_question: quest.media_query_files_question,
                section: quest.section,
                difficulty: quest.difficulty,
                _id: quest._id,
              };
              non_attempted_question.push(result);
            }
          } else {
            non_attempted_question_ids.push(quest._id);
          }
        });
        await Promise.all(question);
        res.status(200).json({
          success: true,
          msg: non_attempted_question,
          ids: non_attempted_question_ids,
        });
      })
      .catch((err) => {
        console.log("Error in finding question: ", err.message);
        res.status(400).json({
          success: false,
          msg: "ERR IN Question",
        });
      });
  } catch (err) {
    console.log("Error : ", err.message);
    res.status(400).json({
      success: false,
      msg: "ERROR IN USERTEST",
    });
  }
};

// paging route for get categorie wise practice question
exports.pagingPracticeQuestion = async (req, res) => {
  send_data = [];
  question = req.query.data.map(async (id) => {
    await Question.findOne({ _id: id })
      .then((quest) => {
        result = {
          category: quest.category,
          question: quest.question,
          media_query_files_question: quest.media_query_files_question,
          section: quest.section,
          difficulty: quest.difficulty,
          _id: quest._id,
        };
        send_data.push(result);
      })
      .catch((err) => {
        console.log("Error in finding question: ", err.message);
      });
  });
  await Promise.all(question);
  res.status(200).json({
    success: true,
    msg: send_data,
  });
};

// practice questions response post route
exports.postResponse = async (req, res) => {
  await UserTestDetails.find({
    user_id: req.user.user_id,
    question_attempted_practice: req.body.question_id,
  })
    .exec()
    .then(async (response) => {
      if (response.length >= 1) {
        res.status(200).json({
          success: true,
          msg: "Response Already posted",
        });
      } else if (req.body.answer_type === "textresponse") {
        const new_response = new Response({
          question_id: req.body.question_id,
          user_id: req.user.user_id,
          user_name: req.body.author_name,
          text_response: {
            text: req.body.text_response,
          },
        });
        new_response.save();
        await calAvg(
          req.body.question_id,
          req.user.user_id,
          req.body.text_response
        )
          .then((value) => {
            res.status(200).json({
              success: true,
              msg: "Answer submitted",
            });
          })
          .catch((err) => {
            console.log("ERR:", err.message);
            res.status(400).json({
              success: false,
              msg: "ERR IN User Test",
            });
          });
      } else if (req.body.answer_type === "speaking") {
        let url, public_id;
        await cloudinary.uploader.upload(
          req.files[0].path,
          {
            resource_type: "video",
            eager_async: true,
            eager_notification_url:
              "https://mysite.example.com/notify_endpoint",
            folder: "responseAudio",
          },
          function (err, result) {
            if (err) {
              console.log("Error in speaking cloudinary: ", err.message);
              res.status(400).json({
                success: false,
                msg: "Error in Upload",
              });
            } else {
              fs.unlinkSync(req.files[0].path);
              url = result.url;
              public_id = result.public_id;
            }
          }
        );
        const new_response = new Response({
          question_id: req.body.question_id,
          user_id: req.user.user_id,
          user_name: req.body.author_name,
          media_link: {
            url: url,
            public_id: public_id,
          },
        });
        new_response.save();
        await UserTestDetails.updateOne(
          { user_id: req.user.user_id },
          {
            $push: { question_attempted_practice: req.body.question_id },
            $inc: { number_of_practice_question: 1 },
          },
          { new: true }
        )
          .exec()
          .then(() => {
            res.status(200).json({
              success: true,
              msg: "Answer submitted",
            });
          })
          .catch((err) => {
            console.log("Error in Speaking:", err.message);
            res.status(400).json({
              success: false,
              msg: "ERR IN User Test",
            });
          });
      } else if (req.body.answer_type === "mcq") {
        let len,
          check_response = [];
        await Response.find({ question_id: req.body.question_id })
          .exec()
          .then((response) => {
            len = response.length;
          })
          .catch((err) => {
            console.log("ERROR MCQ: ", err.message);
          });
        if (len === 1) {
          if (req.body.no_of_answered[0].a === 1) {
            check_response.push("a");
            await Response.updateOne(
              { question_id: req.body.question_id },
              { $inc: { "no_of_answered.$[].a": 1 } }
            ).exec();
          }
          if (req.body.no_of_answered[0].b === 1) {
            check_response.push("b");
            await Response.updateOne(
              { question_id: req.body.question_id },
              { $inc: { "no_of_answered.$[].b": 1 } }
            ).exec();
          }
          if (req.body.no_of_answered[0].c === 1) {
            check_response.push("c");
            await Response.updateOne(
              { question_id: req.body.question_id },
              { $inc: { "no_of_answered.$[].c": 1 } }
            ).exec();
          }
          if (req.body.no_of_answered[0].d === 1) {
            check_response.push("d");
            await Response.updateOne(
              { question_id: req.body.question_id },
              { $inc: { "no_of_answered.$[].d": 1 } }
            ).exec();
          }
          await calAvg(req.body.question_id, req.user.user_id, check_response)
            .then((value) => {
              res.status(200).json({
                success: true,
                msg: "Answer submitted",
              });
            })
            .catch((err) => {
              console.log("ERR:", err.message);
              res.status(400).json({
                success: false,
                msg: "ERR IN User Test",
              });
            });
        } else {
          const new_response = new Response({
            question_id: req.body.question_id,
            user_id: req.user.user_id,
            no_of_answered: req.body.no_of_answered,
          });
          new_response.save();
          check_response = [];
          if (req.body.no_of_answered[0].a === 1) check_response.push("a");
          if (req.body.no_of_answered[0].b === 1) check_response.push("b");
          if (req.body.no_of_answered[0].c === 1) check_response.push("c");
          if (req.body.no_of_answered[0].d === 1) check_response.push("d");
          await calAvg(req.body.question_id, req.user.user_id, check_response)
            .then((value) => {
              res.status(200).json({
                success: true,
                msg: "Answer submitted",
              });
            })
            .catch((err) => {
              console.log("ERR:", err.message);
              res.status(400).json({
                success: false,
                msg: "ERR IN User Test",
              });
            });
        }
      }
    })
    .catch((err) => {
      console.log("Error : ", err.message);
      res.status(400).json({
        success: false,
        msg: "ERROR IN USERTEST",
      });
    });
};

// practice questions response get route
exports.getResponse = async (req, res) => {
  await Response.find({ question_id: req.query.question_id })
    .exec()
    .then(async (response) => {
      // console.log(response);
      send_data = response.slice(0, 5);
      ids = response.slice(5, response.length);
      feed = ids.map((id) => {
        return id._id;
      });
      ids_send = await Promise.all(feed);
      res.status(200).json({
        success: true,
        msg: send_data,
        ids: ids_send,
      });
    })
    .catch((err) => {
      console.log("Error : ", err.message);
      res.status(400).json({
        success: false,
        msg: "ERROR IN Response",
      });
    });
};

// paging practice questions response get route
exports.pagingGetResponse = async (req, res) => {
  send_data = [];
  responses = req.query.data.map(async (id) => {
    await Response.findOne({ _id: id })
      .then((response) => {
        send_data.push(response);
      })
      .catch((err) => {
        console.log("Error in finding response: ", err.message);
      });
  });
  await Promise.all(responses);
  res.status(200).json({
    success: true,
    msg: send_data,
  });
};

// practice questions get my uploads
exports.getMyUploads = async (req, res) => {
  await Question.find({ user_id: req.user.user_id })
    .exec()
    .then(async (questions) => {
      // console.log(response);
      filter_data = questions.slice(0, 5);
      send = filter_data.map((question) => {
        data = {
          category: question.category,
          difficulty: question.difficulty,
          section: question.section,
          question: question.question,
          created_on: question.created_on,
          draft: question.draft,
          media_query_files_question: question.media_query_files_question,
          no_of_response: question.no_of_response,
          no_of_views: question.no_of_views,
        };
        return data;
      });
      send_data = await Promise.all(send);
      ids = questions.slice(5, questions.length);
      feed = ids.map((id) => {
        return id._id;
      });
      ids_send = await Promise.all(feed);
      res.status(200).json({
        success: true,
        msg: send_data,
        ids: ids_send,
      });
    })
    .catch((err) => {
      console.log("Error : ", err.message);
      res.status(400).json({
        success: false,
        msg: "ERROR IN Response",
      });
    });
};

// paging get my upload questions route
exports.pagingGetMyUploads = async (req, res) => {
  send_data = [];
  questions = req.query.data.map(async (id) => {
    await Question.findOne({ _id: id })
      .then((question) => {
        data = {
          category: question.category,
          difficulty: question.difficulty,
          section: question.section,
          question: question.question,
          created_on: question.created_on,
          draft: question.draft,
          media_query_files_question: question.media_query_files_question,
          no_of_response: question.no_of_response,
          no_of_views: question.no_of_views,
        };
        send_data.push(data);
      })
      .catch((err) => {
        console.log("Error in finding my upload question: ", err.message);
        res.status(400).json({
          success: false,
          msg: "Can't get questions",
        });
      });
  });
  await Promise.all(questions);
  res.status(200).json({
    success: true,
    msg: send_data,
  });
};

// increment like of response speaking and text response
exports.likeResponse = async (req, res) => {
  await Response.updateOne({ _id: req.params.id }, { $inc: { no_of_likes: 1 } })
    .then(() => {
      res.status(200).json({
        success: true,
        msg: "Likes Increased",
      });
    })
    .catch((err) => {
      console.log("Error in updating response like: ", err.message);
      res.status(400).json({
        success: false,
        msg: "Can't increases like",
      });
    });
};

exports.getQuestionsForModerator = async (req, res) => {
  const user_id = req.user.user_id;

  User.find({ _id: user_id }).then((user) => {
    if (user.is_moderator) {
      Question.find()
        .then((questions) => {
          res.status(200).json({
            msg: "success",
            questions,
          });
        })
        .catch((error) => {
          console.log(error);
          msg: "failed";
        });
    } else {
      Question.find({ is_verified: true })
        .then((questions) => {
          res.status(200).json({
            msg: "success",
            questions,
          });
        })
        .catch((error) => {
          console.log(error);
          msg: "failed";
        });
    }
  });
};

exports.createMockTest = async (req, res) => {
  await User.findOne({ user_id: req.user.user_id })
    .exec()
    .then(async (user) => {
      if (user.is_moderator) {
        const mock_test = new MockTest({
          mock_test_category: req.body.mock_test_category,
          test_name: req.body.test_name,
          mock_test_time_limit: req.body.mock_test_time_limit,
        });

        for (let i = 0; i < req.body.question_ids.length; i++) {
          Question.findById({ _id: req.body.question_ids[i] }).then(
            (question) => {
              if (question.is_verified) {
                mock_test.question_ids.push(question._id);
              }
            }
          );
        }

       mock_test.no_of_questions = mock_test.question_ids.length
       score_of_mock_test = 5*mock_test.question_ids.length
       
      mock_test.save().then(mock_test=>{
        const percentile = new Percentile()
        percentile.mock_test_id = mock_test._id

        percentile.save().then(()=>{
          console.log("percentile created")
        })

        res.status(200).json({
          msg : 'success',
          mock_test
        })
      })
       
    }
      else {
        res.status(401).json({
          msg: "Unauthorized",
          status: "failed",
        });
      }
    });
};

// increment views of questions
exports.increaseViewQuestion = async (req, res) => {
  await Question.updateOne({ _id: req.params.id }, { $inc: { no_of_views: 1 } })
    .then(() => {
      res.status(200).json({
        success: true,
        msg: "Likes Increased",
      });
    })
    .catch((err) => {
      console.log("Error in updating views of question: ", err.message);
      res.status(400).json({
        success: false,
        msg: "Can't increases view",
      });
    });
};

// get user Test scores
exports.myAttempt = async (req, res) => {
  await UserTestDetails.findOne({ user_id: req.user.user_id })
    .then((details) => {
      send_data = {
        number_of_mock_tests: details.number_of_mock_tests,
        avg_score_mock_test: details.avg_score_mock_test,
        number_of_practice_question: details.number_of_practice_question,
        avg_score_practice_question: details.avg_score_practice_question,
      };
      res.status(200).json({
        success: true,
        msg: send_data,
      });
    })
    .catch((err) => {
      console.log("Error in finding user test details: ", err.message);
      res.status(400).json({
        success: false,
        msg: "Can't find user details",
      });
    });
};

// get My Attempt practice questions details
exports.myAttemptPractice = async (req, res) => {
  await UserTestDetails.findOne({ user_id: req.user.user_id })
    .then(async (details) => {
      filter_data = details.question_attempted_practice.slice(0, 5);
      send_data = [];
      question = filter_data.map(async (id) => {
        await Question.findOne({ _id: id })
          .then((quest) => {
            result = {
              category: quest.category,
              question: quest.question,
              media_query_files_question: quest.media_query_files_question,
              section: quest.section,
              difficulty: quest.difficulty,
              _id: quest._id,
            };
            send_data.push(result);
          })
          .catch((err) => {
            console.log("Error in finding question: ", err.message);
          });
      });
      await Promise.all(question);
      ids_send = details.question_attempted_practice.slice(
        5,
        details.question_attempted_practice.length
      );
      user_details = {
        number_of_practice_question: details.number_of_practice_question,
        correct_percentage_practice: details.current_percentage_practice,
        incorrect_percentage_practice: details.incurrent_percentage_practice,
        avg_accuracy_practice: details.avg_accuracy_practice,
      };
      res.status(200).json({
        success: true,
        msg: user_details,
        questions: send_data,
        ids: ids_send,
      });
    })
    .catch((err) => {
      console.log("Error in finding user test details: ", err.message);
      res.status(400).json({
        success: false,
        msg: "Can't find user details",
      });
    });
};

exports.getMockTest = async (req, res) => {
  if (req.user.user_id) {
    const mock_tests = await MockTest.find({
      mock_test_category: req.params.category,
    });

    var mock_test = mock_tests[Math.floor(Math.random() * mock_tests.length)];
    console.log(mock_test);
    res.status(200).json({
      msg: "success",
      mock_test,
    });
  } else {
    res.status(401).json({
      msg: "unauthorized",
    });
  }
}

const Percentile = require('../models/percentile')

const calPercentile = (mock_test_id , user_id , score_in_mock)=>{
  Percentile.findOne({mock_test_id : mock_test_id}).then((percentile)=>{
     percentile.users_marks.push(score_in_mock)
     percentile.users_attempted_mock.push(user_id)
     
     let marks_array = percentile.users_marks

     marks_array.sort(function(a , b){return a-b})

     let reversed_marks_array =  marks_array.reverse()

     let index = reversed_marks_array.indexOf(score_in_mock)
     index+= 1

     let percentile_of_user = parseFloat((index/marks_array.length)*100).toFixed(2)

     MockTestResponse.findOneAndUpdate({user_id : user_id} , {"$set" : {"percentile" : percentile_of_user}} ).then(()=>{
       console.log("percentile updated ");
     }).catch(err=>{
      console.log(err)
    })
  })
}



const avgPercentile =async  (mock_test_id)=>{
  const percentiles = await MockTestResponse.find({user_id : req.user.user_id})
  const number_of_mock_tests = await UserTestDetails.findOne({user_id : req.user.user_id})

  let avg_percentile = 0

  percentiles.forEach(el=> avg_percentile+el.percentile )

  avg_percentile = avg_percentile/number_of_mock_tests

  UserTestDetails.findOneAndUpdate({user_id : req.user.user_id} , {$set : {"avg_mock_percentile" : avg_percentile}} , {new : true}).then(()=>{
    console.log("avg_percentile updated")
  }).catch(err=>{
    console.log(err)
  })
}



exports.submitMockTest = async (req, res) => {
  let correct = 0;
  const mock_test = await MockTest.findById({ _id: req.params.mockTestId });
  let total_mock_test_questions = mock_test.question_ids.length;
  const responses = req.body.user_answers;
  const question_ids = mock_test.question_ids;

  for (let i = 0; i < responses.length; i++) {
    if (responses[i]) {
      const mock_test_response = new MockTestResponse();
      mock_test_response.user_id = req.user.user_id;
      mock_test_response.test_name = mock_test.test_name;
      mock_test_response.no_of_questions = total_mock_test_questions;
      mock_test_response.no_of_questions_attempted = responses.length;
      mock_test_response.mock_test_time_limit = mock_test.mock_test_time_limit;
      mock_test_response.submitted_on = Date.now();
      mock_test_response.response = responses[i];
      mock_test_response.question_id = question_ids[i];
      mock_test_response.mock_test_id = mock_test._id;
      mock_test_response.response.question_id = mock_test.question_id;
      mock_test_response.response.user_answer = responses[i];
      const correct_answer_of_question = await Answer.findOne({
        question_id: question_ids[i],
      });
      mock_test_response.response.correct_answer = correct_answer_of_question;
      mock_test_response.save();

      console.log(mock_test_response);
    }
  }

  for(let i=0;i<responses.length;i++){
    if(responses[i]!=''){
      const answer = await Answer.findOne({question_id : question_ids[i]})
      if(answer.answer_type==='mcq'){
        let flag = true
         if(answer.correct_answers.length === responses[i].length){
           responses[i].map(el=>{
             if(!(answer.correct_answers.includes(el))){
               flag = false
             }
           })
         }else{
           flag = false
         }
  
         if(flag){
           correct+= 1;
         }
      }else if(answer.answer_type === 'text'){
        const correct_text_answer = answer.correct_answers[0].split(' ')
        const user_answer = responses[i].split(' ')
        const flag = true
        if(correct_text_answer.length === user_answer.length){
           user_answer.map(el=>{
             if(!(correct_text_answer.includes(el))){
               flag = false
             }
           })
        }else{
          flag = false
        }
  
        if(flag){
          correct+=1
        }
      }
    }
  }
 
  console.log(correct);

  // const percentile = calPercentile(mock_test._id , req.user.user_id ,correct)
  
  // console.log(avg_mock_accuracy , score_in_mock)
  const user_details = await UserTestDetails.findOne({user_id : req.user.user_id})
  let avg_mock_accuracy = parseFloat((correct/responses.length).toFixed(2))
  let score_in_mock = parseFloat((correct/total_mock_test_questions).toFixed(2))
  let user_no_of_mock_test = user_details.number_of_mock_tests + 1
  let user_mock_average = parseFloat((((user_details.avg_score_mock_test + score_in_mock)/user_no_of_mock_test)*100).toFixed(2))

  let user_mock_accuracy = ((user_details.avg_mock_accuracy + avg_mock_accuracy)/user_no_of_mock_test)

  await UserTestDetails.updateOne({user_id : req.user.user_id} , {
    $set : {"number_of_mock_tests" : user_no_of_mock_test , "avg_score_mock_test" : user_mock_average , "avg_mock_accuracy" : user_mock_accuracy}, 
    $push : {"mock_attempted" : req.params.mockTestId}
  } , {new : true}).exec()




  console.log(user_details);
  res.status(200).json({
    msg: "success",
  });
};

exports.getMockTestReport = (req, res) => {
  MockTestResponse.findOne({ mock_test_id: req.params.mockTestId })
    .populate("response.question_id")
    .exec((err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ success: true, msg: "Error Getting Test Report " });
      }

      res.json(data);
    });
};

// get My Attempt mock test details
exports.myAttemptMockTest = async (req, res) => {
  await UserTestDetails.findOne({ user_id: req.user.user_id })
  .then(async (details) => {
    filter_data = details.mock_attempted.slice(0, 5);
    send_data = [];
    mock_details = filter_data.map(async (id) => {
      await MockTestResponse.findOne({ _id: id })
        .then((detail) => {
          result = {
            _id: detail._id,
            test_name: detail.test_name,
            submitted_on: detail.submitted_on,
            mock_test_time_taken: detail.mock_test_time_taken,
            mock_test_time_limit: detail.mock_test_time_limit,
            no_of_questions: detail.no_of_questions,
            no_of_questions_attempted: detail.no_of_questions_attempted,
            score_of_mock_test: detail.score_of_mock_test,
            score_of_user_mock_test: detail.score_of_user_mock_test,
            percentile: detail.percentile,
          };
          send_data.push(result);
        })
        .catch((err) => {
          console.log("Error in finding mock test: ", err.message);
        });
    });
    await Promise.all(mock_details);
    ids_send = details.mock_attempted.slice(
      5,
      details.mock_attempted.length
    );
    user_details = {
      number_of_mock_tests: details.number_of_mock_tests,
      avg: details.avg,
      avg_mock_percentile: details.avg_mock_percentile,
      avg_mock_accuracy: details.avg_mock_accuracy,
    };
    res.status(200).json({
      success: true,
      msg: user_details,
      mock_details: send_data,
      ids: ids_send,
    });
  })
  .catch((err) => {
    console.log("Error in finding user test details: ", err.message);
    res.status(400).json({
      success: false,
      msg: "Can't find user details",
    });
  }); 
}