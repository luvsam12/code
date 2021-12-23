var connection = require("../config/mysql_db_con");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Posts = require("../models/post");
const Interests = require("../models/category");
const Skills = require("../models/skill");
const Experiences = require("../models/experience");
const Educations = require("../models/education");
const Researchs = require("../models/research");
const Social = require("../models/socialprofile");
const Certificates = require("../models/certificate");
const ObjectId = require("mongodb").ObjectID;
const Notifications = require("../models/notification");
const Emailverification = require("../models/emailverification");
const Forgotpassword = require("../models/forgotpassword");
const { Mongoose } = require("mongoose");
const { sendEmail } = require("../mailes/mail");
const uuid = require("uuid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const webp = require("webp-converter");
const UserTestDetails = require("../models/usertestdetails");
const { findByIdAndUpdate } = require("../models/user");
// this will grant 755 permission to webp executables
webp.grant_permission();

cloudinary.config({
  cloud_name: "dxvc9qd2g",
  api_key: "765672581547499",
  api_secret: "cbU_DCL9fDVy6K-ymkaW2EfnCHA",
});

exports.abc = (req, res) => {
  // console.log(uuid.v4());
};

exports.registerUser =async (req, res) => {
  if(/^\S+@\S+\.\S+$/.test(req.body.user_email_id)===false){
    res.status(400).json({success  : false, msg : 'Please enter a valid email'})
  }
  
  const user_ = await User.findOne({user_email_id : req.body.user_email_id})

  if(user_){
    return res.status(400).json({success : false, msg : 'User already registered'})
  }

  req.body.user_email_id = req.body.user_email_id.toLowerCase();
  const user = new User(req.body);
  const verifytoken = uuid.v4();



  user
    .save()
    .then(() => {
      sendEmail(user.user_email_id, verifytoken, "emailVerification");

      User.find({ user_email_id: user.user_email_id })
        .then((id) => {
          const usertestdetail = new UserTestDetails({
            user_id: id[0]._id,
          });
          usertestdetail.save();
          const emailverify = new Emailverification({
            token: verifytoken,
            user_id: id[0]._id,
          });

          emailverify
            .save()
            .then(() => {
              res
                .status(200)
                .json({ success: true, msg: "New User and email sent" });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ success: false, msg: "Token not save" });
            });
        })
        .catch(() => {
          res.status(400).json({ success: false, msg: "can't find user" });
        });
    })
    .catch(() => {
      res.status(400).json({ success: false, msg: "No user registred" });
    });
};

// User Login
exports.loginUser = (req, res) => {
  if(/^\S+@\S+\.\S+$/.test(req.body.user_email_id)===false){
    res.status(400).json({success  : false, msg : 'Please enter a valid password'})
  }
  var email = req.body.user_email_id.toLowerCase();
  User.findOne({ user_email_id: email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        authdata = {
          user_id: user._id,
          full_name: user.full_name,
        };
        const token = user.token;
        const username = user.full_name.split(' ')[0] + token[token.length - 1] + token[token.length - 2]
        console.log(username);
        User.updateOne({user_email_id : email} , {$set : {"username" : username} } , {new : true}).then(user=>{
          console.log(user)
        })
        console.log(token);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          authdata,
          token,
        });
      });
    });
  });
};

// User Logout
exports.logoutUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user.user_id },
    { token: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
};

// exports.forgotPassword = (req, res) => {
//   const forgottoken = uuid.v4();

//   if(!(req.body.email)){
//     res.status(400).json({ success: false,msg : 'Please enter a email id '})
//   }

//   User.findOne({ user_email_id: req.body.email })
//     .then((user) => {
//       // console.log("user", user._id);
//       sendEmail(user.user_email_id, forgottoken, "forgotPassword");

//       const forgotpassword = new Forgotpassword({
//         token: forgottoken,
//         user_id: user._id,
//       });
//       // console.log(forgotpassword);

//       Forgotpassword.deleteMany({ user_id: user._id })
//         .then(() => {
//           forgotpassword
//             .save()
//             .then(() => {
//               res
//                 .status(200)
//                 .json({ success: true, msg: "email sent for forgot link" });
//             })
//             .catch(() => {
//               res.status(400).json({ success: false, msg: "can't send email" });
//             });
//         })
//         .catch(() => {
//           res
//             .status(400)
//             .json({ success: false, msg: "can't delete old tokens" });
//         });
//     })
//     .catch(() => {
//       res.status(400).json({ success: false, msg: "can't find user" });
//     });
// };

exports.forgotPassword =async (req, res)=>{
  const forgottoken = uuid.v4();

  if(!(req.body.email)){
    res.status(400).json({ success: false,msg : 'Please enter a email id '})
  }

  if(/^\S+@\S+\.\S+$/.test(req.body.email)===false){
     res.status(400).json({success  : false, msg : 'Please enter a valid password'})
  }

  const user = await User.findOne({user_email_id : req.body.email})
  if(!user){
    return res.status(400).json({ success : false , msg : "can't find user with this email id" })
  }

  sendEmail(user.user_email_id, forgottoken, "forgotPassword");

  const forgotpassword = new Forgotpassword({
    token: forgottoken,
    user_id: user._id,
  });

  

  Forgotpassword.deleteMany({ user_id: user._id })
        .then(() => {
          forgotpassword
            .save()
            .then(() => {
              res
                .status(200)
                .json({ success: true, msg: "email sent for forgot link" });
            })
            .catch(() => {
              res.status(400).json({ success: false, msg: "can't send email" });
            });
        })
        .catch(() => {
          res
            .status(400)
            .json({ success: false, msg: "can't delete old tokens" });
        });

}

exports.verifyEmail = (req, res) => {
  // console.log(req.params.token);
  Emailverification.findOne({ token: req.params.token })
    .then((value) => {
      User.updateOne({ _id: value.user_id }, { verified: "True" })
        .then(() => {
          Emailverification.deleteOne({ _id: value._id })
            .then(() => {
              res.status(200).json({ success: true, msg: "Email verified" });
            })
            .catch((err) => {
              // console.log(err);
              res
                .status(400)
                .json({ success: false, msg: "can't delete document" });
            });
        })
        .catch(() => {
          res.status(400).json({ success: false, msg: "can't write true" });
        });
    })
    .catch((err) => {
      res.redirect("http://localhost:4200/register");
    });
};

exports.checkToken = (req, res) => {
  Forgotpassword.findOne({ token: req.params.token })
    .then((value) => {
      const user = value.user_id;
      Forgotpassword.deleteMany({ user_id: user })
        .then(() => {
          res.status(200).send({
            success: true,
            msg: user,
          });
        })
        .catch(() => {
          res
            .status(400)
            .json({ success: false, msg: "can't delete old tokens" });
        });
    })
    .catch((err) => {
      res.status(200).send({
        success: false,
      });
    });
};

//verify whether to show popup or not
//Access @Private
exports.postUserDocument = (req, res) => {
  const userId = req.user.user_id;
  User.findOne({ _id: userId }).then((user) => {
    // if (!user) {
    //   res.json({ msg: "user not found" });
    // } else {
    if (user.login_count >= 0) {
      if (user.login_count < 3 && user.interest.length === 0) {
        User.updateOne({ _id: userId }, { $inc: { login_count: 1 } })
          .then(() => res.json({ showPopup: true }))
          .catch(() => console.log("Cant Update"));
      } else {
        res.json({ showPopup: false });
      }
    } else {
      res.json({ showPopup: false });
    }
    // }
  });
};

//Get User Interest
//Access @Private
exports.getUserInterest = (req, res) => {
  User.find({ _id: req.user.user_id })
    .then((user) => {
      console.log(user);
      res.status(200).send({
        success: true,
        msg: user[0].interest,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "NO interest Found",
      });
    });
};

//Save User Interest
//Access @Private
exports.postUserInterest = (req, res) => {
  // console.log(req.body.interest);
  User.updateOne(
    { _id: req.user.user_id },
    { interest: req.body.interest, $unset: { login_count: "" } }
  )
    .then(() =>
      Interests.updateMany(
        { _id: { $in: req.body.interest } },
        { $inc: { num_of_followers: 1 } }
      )
        .then(() => {
          res
            .status(200)
            .json({ success: true, msg: "interest increased and saved" });
        })
        .catch((err) => {
          res
            .status(400)
            .json({ success: false, msg: "can't increase interest" });
        })
    )
    .catch((err) => res.send({ success: false }));
};

//Save user single Interest
exports.postSingleInterest = (req, res) => {
  User.updateOne(
    { _id: req.user.user_id },
    { $addToSet: { interest: [req.params.interest_id] } }
  ).then(() => {
    Interests.updateOne(
      { _id: ObjectId(req.params.interest_id) },
      { $inc: { num_of_followers: 1 } }
    )
      .then(() => {
        res
          .status(200)
          .json({ success: true, msg: "interest increased and saved" });
      })
      .catch(() => {
        res
          .status(400)
          .json({ success: false, msg: "can't increase interest" });
      });
  });
};

//Delete User Interest
exports.deleteSingleInterest = (req, res) => {
  User.updateOne(
    { _id: req.user.user_id },
    { $pull: { interest: req.params.interest_id } }
  ).then(() => {
    Interests.updateOne(
      { _id: ObjectId(req.params.interest_id) },
      { $inc: { num_of_followers: -1 } }
    )
      .then(() => {
        res
          .status(200)
          .json({ success: true, msg: "interest decreased and deleted" });
      })
      .catch(() => {
        res
          .status(400)
          .json({ success: false, msg: "can't decrease interest" });
      });
  });
};

//Get Profile Image of Users
exports.getProfileImage = (req, res) => {
  User.findOne({ _id: req.params.user_id }, { profile_image_path: 1 })
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch(() => {
      res
        .status(400)
        .json({ success: false, msg: "error occured while fetching image" });
    });
};

//Follow User
exports.postFollow = (req, res) => {
  User.updateOne(
    { _id: req.user.user_id },
    { $addToSet: { following: [req.params.other_user_id] } }
  )
    .then(() => {
      User.updateOne(
        { _id: req.params.other_user_id },
        { $addToSet: { followers: [req.user.user_id] } }
      )
        .then(() => {
          res.status(200).json({ success: true, msg: "User followed" });
        })
        .catch(() => {
          res
            .status(400)
            .json({ success: false, msg: "Can't save follow User" });
        });
    })
    .catch(() => {
      res.status(400).json({ success: false, msg: "Can't follow User" });
    });
};

//Unfollow User
exports.deleteFollow = (req, res) => {
  User.updateOne(
    { _id: req.user.user_id },
    { $pull: { following: req.params.other_user_id } }
  )
    .then(() => {
      User.updateOne(
        { _id: ObjectId(req.params.other_user_id) },
        { $pull: { followers: req.user.user_id } }
      )
        .then(() => {
          res.status(200).json({ success: true, msg: "User unfollowed" });
        })
        .catch(() => {
          res
            .status(400)
            .json({ success: false, msg: "Can't delete follow User" });
        });
    })
    .catch(() => {
      res.status(400).json({ success: false, msg: "Can't unfollow User" });
    });
};

//Get all post done by user

exports.getAllPost = (req, res) => {
  // console.log(req.user.user_id);
  Posts.find({ user_id: req.user.user_id })
    .populate("category")
    .then((post) => {
      res.json(post);
    })
    .catch(() => {
      res.status(400).json({ success: false, msg: "Can't find user" });
    });
};

//To get total Kudos of the user
exports.getKudos = (req, res) => {
  User.find({ _id: req.user.user_id })
    .then((user) => {
      res.json(user[0].kudos);
    })
    .catch((err) => {
      res.status(404).send("No data found");
    });
};

//To get all the bookmarks of the user
exports.getBookmarks = (req, res) => {
  User.find({ _id: req.user.user_id })
    .then((user) => {
      Posts.find({ _id: { $in: user[0].bookmarks } })
        .populate("category")
        .populate("user_id", "followers")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(400).json({ success: false, msg: "no data found" });
        });
    })
    .catch((err) => {
      res.status(404).send("No data found");
    });
};

//Send connection request
exports.postconnectionrequest = (req, res) => {
  // console.log(req.body);
  User.updateOne(
    { _id: req.body.from_user },
    { $addToSet: { requested: [req.body.to_user] } }
  )
    .then(() => {
      User.updateOne(
        { _id: req.body.to_user },
        { $addToSet: { pending: req.body.from_user } }
      )
        .then(() => {
          res
            .status(200)
            .json({ success: true, msg: "User succesfully requested" });
        })
        .then(() => {
          const date = new Date();
          date.setHours(date.getHours() + 5);
          date.setMinutes(date.getMinutes() + 30);
          User.findById(req.user.user_id).then((user) => {
            const notification = new Notifications({
              user_id: [],
              post_id: req.params.post_id,
              notification_message: `${user.full_name} send you a connection request  `,
              notification_user_type: "send_request",
              count: 0,
              created_on: date,
            });
            notification.user_id.push(req.body.to_user);
            User.findById(req.body.to_user).then((data) => {
              if (data.notification_connection_send == true) {
                notification
                  .save()
                  .then((data) => {
                    User.findById(req.body.to_user).then((user) => {
                      user.notification.push({ id: data._id, isRead: false });
                      user.unread_notification = user.unread_notification + 1;
                      user
                        .save()
                        .then(() => {
                          console.log(
                            "Connection request notification created successfully"
                          );
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
        })
        .catch(() => {
          res
            .status(400)
            .json({ success: false, msg: "can't save in Pending array" });
        });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "can't save in requested array" });
    });
};

//Accept connection request
exports.postconnection = (req, res) => {
  User.updateOne(
    { _id: req.body.from_user },
    {
      $pull: { requested: req.body.to_user },
      $addToSet: { connections: [req.body.to_user] },
    }
  )
    .then(() => {
      User.updateOne(
        { _id: req.body.to_user },
        {
          $pull: { pending: req.body.from_user },
          $addToSet: { connections: [req.body.from_user] },
        }
      )
        .then(() => {
          res
            .status(200)
            .json({ success: true, msg: "User succesfully connected" });
        })
        .then(() => {
          const date = new Date();
          date.setHours(date.getHours() + 5);
          date.setMinutes(date.getMinutes() + 30);
          User.findById(req.body.from_user).then((user) => {
            const notification = new Notifications({
              user_id: [],
              notification_message: `${user.full_name} accepted your connection request  `,
              notification_user_type: "accept_request",
              count: 0,
              created_on: date,
            });
            notification.user_id.push(req.body.to_user);
            User.findById(req.body.to_user).then((data) => {
              if (data.notification_connection_send == true) {
                notification
                  .save()
                  .then((data) => {
                    User.findById(req.body.to_user).then((user) => {
                      user.notification.push({ id: data._id, isRead: false });
                      user.unread_notification = user.unread_notification + 1;
                      user
                        .save()
                        .then(() => {
                          console.log(
                            "Connection request Accepted notification created successfully"
                          );
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
        })
        .catch(() => {
          res.status(400).json({
            success: false,
            msg: "can't save in to user connection array",
          });
        });
    })
    .catch(() => {
      res.status(400).json({
        success: false,
        msg: "can't save in from user connection array",
      });
    });
};

//Reject Connection Request
exports.deleteconnectionrequest = (req, res) => {
  User.updateOne(
    { _id: req.body.from_user },
    { $pull: { requested: req.body.to_user } }
  )
    .then(() => {
      User.updateOne(
        { _id: req.body.to_user },
        { $pull: { pending: req.body.from_user } }
      )
        .then(() => {
          res
            .status(200)
            .json({ success: true, msg: "User succesfully rejected" });
        })
        .catch(() => {
          res
            .status(400)
            .json({ success: false, msg: "can't reject from pending array" });
        });
    })
    .catch(() => {
      res
        .status(400)
        .json({ success: false, msg: "can't reject from requested array" });
    });
};

//Disconnect user
exports.deleteconnection = (req, res) => {
  User.updateOne(
    { _id: req.body.from_user },
    { $pull: { connections: req.body.to_user } }
  )
    .then(() => {
      User.updateOne(
        { _id: req.body.to_user },
        { $pull: { connections: req.body.from_user } }
      )
        .then(() => {
          res
            .status(200)
            .json({ success: true, msg: "User succesfully disconnected" });
        })
        .catch(() => {
          res.status(400).json({
            success: false,
            msg: "can't disconnect to user connections array",
          });
        });
    })
    .catch(() => {
      res
        .status(400)
        .json({ success: false, msg: "can't disconnect from user array" });
    });
};

//to get notification of a user
exports.getNotifications = async (req, res) => {
  req.body.notificationArray = [];
  await User.findById(req.user.user_id)
    .then((user) => {
      user.notification.map(async (notification, index) => {
        await Notifications.findById(notification.id)
          .then((data) => {
            req.body.notificationArray.push(data);
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(400)
              .json({ success: false, msg: "Error getting notifications" });
          });
        if (index == user.notification.length - 1) {
          res
            .status(200)
            .json({ success: true, data: req.body.notificationArray });
          user.unread_notification = 0;
          user
            .save()
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
          return;
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, msg: "Error getting notifications" });
    });
};

exports.saveNotification = (req, res) => {
  const notification = new Notifications({
    user_id: req.user.user_id,
    post_id: req.body.post_id,
    sender_id: req.body.sender_id,
    notification_message: "Test Notification 4",
  });
  notification
    .save()
    .then(() => {
      res.status(200).json({ success: true, msg: "notification saved" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "no data found" });
    });
};

//Route for fetching user data
exports.getUserPersonalDetails = (req, res) => {
  User.findOne({ _id: req.params.user_id }, { password: 0 })
    .then((user) => {
      res.status(200).json({ success: true, userData: user });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "no data found" });
    });
};

//Route for updating user personal details fullname and about user
exports.updateUserPersonalDetailsFirst = (req, res) => {
  const updatedUser = {
    full_name: req.body.full_name,
    about_user: req.body.about_user,
  };
  User.updateOne({ _id: ObjectId(req.user.user_id) }, updatedUser)
    .then(() =>
      res.status(200).json({ success: true, msg: "User Details updated" })
    )
    .catch((err) =>
      res.status(400).json({ success: false, msg: "can't update User Details" })
    );
};

//Route for updating user other details
exports.updateUserPersonalDetailsSecond = (req, res) => {
  const updatedUser = {
    contact_number: req.body.contact_number,
    date_of_birth: req.body.date_of_birth,
    user_country: req.body.user_country,
    user_address: req.body.user_address,
    user_bio: req.body.user_bio,
  };
  User.updateOne({ _id: ObjectId(req.user.user_id) }, updatedUser)
    .then(() =>
      res.status(200).json({ success: true, msg: "User Details updated" })
    )
    .catch((err) =>
      res.status(400).json({ success: false, msg: "can't update User Details" })
    );
};

//Route for changing profile image
exports.changeProfileImage = async (req, res) => {

  var fileName = req.files[0].path.replace(/^.*[\\\/]/, "").split(".")[0];
  await webp
    .cwebp(req.files[0].path, "public/uploads/" + fileName + ".webp", "-q 80")
    .then((response) => {});
  await cloudinary.uploader.upload(
    "public/uploads/" + fileName + ".webp",
    { folder: "ProfileImages" },
    function (err, result) {
      if (err) {
        console.log(err);
        fs.unlinkSync(req.files[0].path);
        fs.unlinkSync("public/uploads/" + fileName + ".webp");
      } else {
        fs.unlinkSync(req.files[0].path);
        fs.unlinkSync("public/uploads/" + fileName + ".webp");
        var filepath = "<div><img src='" + result.url + "' ></div>";
        User.findOne({ _id: req.user.user_id }).then((user) => {
          if (user.profie_image_public_id) {
            cloudinary.uploader.destroy(
              user.profie_image_public_id,
              function (err, result) {
                if (err) return res.status(400).json({ success: false, err });
              }
            );
          }
        });
        var filepath = result.url;
        var profie_image_public_id = result.public_id;
        const updatedUser = {
          profile_image_path: filepath,
          profie_image_public_id: profie_image_public_id,
        };
        User.updateOne({ _id: req.user.user_id }, updatedUser)
          .then(() =>
            res.status(200).json({ success: true, msg: "User Profile updated" })
          )
          .catch((err) =>
            res
              .status(400)
              .json({ success: false, msg: "can't update User Profile" })
          );
      }
    }
  );
};

//Route for getting skills of user
exports.getSkills = (req, res) => {
  var userId = req.params.user_id;
  Skills.find({ user_id: userId })
    .then((skills) => {
      res.status(200).json({ success: true, data: skills });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: err });
    });
};

//Route for posting skills of user
exports.postSkills = (req, res) => {
  var userId = req.user.user_id;
  const newSkill = new Skills({
    user_skill: req.body.user_skill,
    user_skill_rating: req.body.user_skill_rating,
    user_id: userId,
  });
  newSkill
    .save()
    .then(() => {
      res.status(200).json({ success: true, msg: "Skill created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "error creating the skill" });
    });
};

//Route for updating skills of user
exports.updateSkills = (req, res) => {
  var userId = req.user.user_id;
  const updatedSkill = new Skills({
    _id: req.body.skill_id,
    user_skill: req.body.user_skill,
    user_skill_rating: req.body.user_skill_rating,
    user_id: userId,
  });
  Skills.updateOne({ _id: req.body.skill_id }, updatedSkill)
    .then(() => {
      res.status(200).json({ success: true, msg: "Skill updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "error updating the skill" });
    });
};

//Route for deleting skills of user
exports.deleteSkills = (req, res) => {
  Skills.deleteOne({ _id: req.params.skill_id })
    .then(() => {
      res.status(200).json({ success: true, msg: "Skill deleted" });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "error deleting the skill" });
    });
};

//Route for getting experience of user
exports.getExperience = (req, res) => {
  var userId = req.params.user_id;
  Experiences.find({ user_id: userId })
    .then((experiences) => {
      res.status(200).json({ success: true, data: experiences });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: err });
    });
};

//Route for posting experience of user
exports.postExperience = (req, res) => {
  var userId = req.user.user_id;
  const newExperience = new Experiences({
    company_name: req.body.company_name,
    designation_title: req.body.designation_title,
    job_start_date: req.body.job_start_date,
    job_end_date: req.body.job_end_date,
    user_id: userId,
  });
  newExperience
    .save()
    .then(() => {
      res.status(200).json({ success: true, msg: "Experience created" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "error creating the experience" });
    });
};

//Route for Updating user experience
exports.updateExperience = (req, res) => {
  var userId = req.user.user_id;
  const updatedExperience = new Experiences({
    company_name: req.body.company_name,
    designation_title: req.body.designation_title,
    job_start_date: req.body.job_start_date,
    job_end_date: req.body.job_end_date,
    user_id: userId,
    _id: req.body.experience_id,
  });
  Experiences.updateOne({ _id: req.body.experience_id }, updatedExperience)
    .then(() => {
      res.status(200).json({ success: true, msg: "Experience Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ success: false, msg: "error updating the experience" });
    });
};

//Route for deleting experience of user
exports.deleteExperience = (req, res) => {
  Experiences.deleteOne({ _id: req.params.experience_id })
    .then(() => {
      res.status(200).json({ success: true, msg: "Experience deleted" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "error deleting the experience" });
    });
};

//Route for getting Education of user
exports.getEducation = (req, res) => {
  var userId = req.params.user_id;
  Educations.find({ user_id: userId })
    .then((educations) => {
      res.status(200).json({ success: true, data: educations });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: err });
    });
};

//Route for creating education of user
exports.postEducation = (req, res) => {
  var userId = req.user.user_id;
  const newEducation = new Educations({
    institution_name: req.body.institution_name,
    degree_title: req.body.degree_title,
    degree_start_date: req.body.degree_start_date,
    degree_end_date: req.body.degree_end_date,
    degree_grade: req.body.degree_grade,
    user_id: userId,
  });
  newEducation
    .save()
    .then(() => {
      res.status(200).json({ success: true, msg: "Education created" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "error creating the education" });
    });
};

//Route for updating education of user
exports.updateEducation = (req, res) => {
  var userId = req.user.user_id;
  const updatedEducation = new Educations({
    institution_name: req.body.institution_name,
    degree_title: req.body.degree_title,
    degree_start_date: req.body.degree_start_date,
    degree_end_date: req.body.degree_end_date,
    degree_grade: req.body.degree_grade,
    user_id: userId,
    _id: req.body.education_id,
  });
  Educations.updateOne({ _id: req.body.education_id }, updatedEducation)
    .then(() => {
      res.status(200).json({ success: true, msg: "Education Updated" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "error updating the education" });
    });
};

//Route for deleting education of user
exports.deleteEducation = (req, res) => {
  Educations.deleteOne({ _id: req.params.education_id })
    .then(() => {
      res.status(200).json({ success: true, msg: "Education deleted" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "error deleting the education" });
    });
};

//Route for getting Research of user
exports.getResearch = (req, res) => {
  var userId = req.params.user_id;
  Researchs.find({ user_id: userId })
    .then((research) => {
      res.status(200).json({ success: true, data: research });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: err });
    });
};

//Route for creating Research of user
exports.postResearch = (req, res) => {
  var userId = req.user.user_id;
  const newResearch = new Researchs({
    research_topic: req.body.research_topic,
    publication_date: req.body.publication_date,
    user_id: userId,
  });
  newResearch
    .save()
    .then(() => {
      res.status(200).json({ success: true, msg: "Research created" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ success: false, msg: "error creating the Research" });
    });
};

//Route for updating Research of user
exports.updateResearch = (req, res) => {
  var userId = req.user.user_id;
  const updatedResearch = new Researchs({
    _id: req.body.research_id,
    research_topic: req.body.research_topic,
    publication_date: req.body.publication_date,
    user_id: userId,
  });
  Researchs.updateOne({ _id: req.body.research_id }, updatedResearch)
    .then(() => {
      res.status(200).json({ success: true, msg: "Research Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ success: false, msg: "error updating the Research" });
    });
};

//Route for deleting Research of user
exports.deleteResearch = (req, res) => {
  Researchs.deleteOne({ _id: req.params.research_id })
    .then(() => {
      res.status(200).json({ success: true, msg: "Research deleted" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "error deleting the Research" });
    });
};

//Route for getting Research of user
exports.getCertificate = (req, res) => {
  var userId = req.params.user_id;
  Certificates.find({ user_id: userId })
    .then((certificate) => {
      res.status(200).json({ success: true, data: certificate });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: err });
    });
};

//Route for creating Research of user
exports.postCertificate = (req, res) => {
  var userId = req.user.user_id;
  const newCertificate = new Certificates({
    certifying_firm: req.body.certifying_firm,
    name_of_certification: req.body.name_of_certification,
    date_of_completion: req.body.date_of_completion,
    user_id: userId,
  });
  newCertificate
    .save()
    .then(() => {
      res.status(200).json({ success: true, msg: "certificate created" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ success: false, msg: "error creating the certificate" });
    });
};

//Route for updating Research of user
exports.updateCertificate = (req, res) => {
  var userId = req.user.user_id;
  const updatedCertificate = new Certificates({
    _id: req.body.certificate_id,
    certifying_firm: req.body.certifying_firm,
    name_of_certification: req.body.name_of_certification,
    date_of_completion: req.body.date_of_completion,
    user_id: userId,
  });
  Certificates.updateOne({ _id: req.body.certificate_id }, updatedCertificate)
    .then(() => {
      res.status(200).json({ success: true, msg: "certificate Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ success: false, msg: "error updating the certificate" });
    });
};

//Route for deleting Research of user
exports.deleteCertificate = (req, res) => {
  Certificates.deleteOne({ _id: req.params.certificate_id })
    .then(() => {
      res.status(200).json({ success: true, msg: "certificate deleted" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "error deleting the certificate" });
    });
};

//Route for getting Social Profile of user
exports.getSocial = (req, res) => {
  var userId = req.params.user_id;
  Social.find({ user_id: userId })
    .then((social) => {
      res.status(200).json({ success: true, data: social });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: err });
    });
};

//Route for creating Social Profile of user
exports.postSocial = (req, res) => {
  var userId = req.user.user_id;
  const newSocial = new Social({
    website: req.body.website,
    username: req.body.username,
    link: req.body.link,
    user_id: userId,
  });
  newSocial
    .save()
    .then(() => {
      res.status(200).json({ success: true, msg: "social profile created" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ success: false, msg: "error creating the social profile" });
    });
};

//Route for updating Social Profile of user
exports.updateSocial = (req, res) => {
  var userId = req.user.user_id;
  const updatedSocial = new Social({
    _id: req.body.social_id,
    website: req.body.website,
    username: req.body.username,
    link: req.body.link,
    user_id: userId,
  });
  Social.updateOne({ _id: req.body.social_id }, updatedSocial)
    .then(() => {
      res.status(200).json({ success: true, msg: "social profile Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ success: false, msg: "error updating the social profile" });
    });
};

//Route for deleting Social Profile of user
exports.deleteSocial = (req, res) => {
  Social.deleteOne({ _id: req.params.social_id })
    .then(() => {
      res.status(200).json({ success: true, msg: "social profile deleted" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "error deleting the social profile" });
    });
};

//Route for reading the notification

exports.readNotification = (req, res) => {
  console.log(req.params.notificationId);
  User.findOne({ _id: req.user.user_id }).then((data) => {
    console.log(data);
    data.notification.map((notification) => {
      if (notification.id == req.params.notificationId) {
        notification.isRead = true;
      }
    });
    data
      .save()
      .then(() => {
        console.log("Notification Read SuccessFully");
        res
          .status(200)
          .json({ success: true, msg: "Notification Read SuccessFully" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.changePushNotificationSettings = (req, res) => {
  console.log(req.user);
  const type = req.body.type;
  const value = req.body.value;
  if (type == "comment") {
    User.findByIdAndUpdate(
      req.user.user_id,
      { notification_comment: value },
      (err, doc) => {
        if (err) {
          res.status(400).json({
            success: false,
            msg: "error changing notification settings",
          });
        }
        console.log(doc);
        res.status(200).json({
          success: true,
          msg: "Notification Settings  Changed SuccessFully",
        });
      }
    );
  }
  if (type == "like") {
    User.findByIdAndUpdate(
      req.user.user_id,
      { notification_like: value },
      (err, doc) => {
        if (err) {
          res
            .status(400)
            .json({ success: false, msg: "error deleting the social profile" });
        }

        res.status(200).json({
          success: true,
          msg: "Notification Settings  Changed SuccessFully",
        });
      }
    );
  }
  if (type == "connection_accept") {
    User.findByIdAndUpdate(
      req.user.user_id,
      { notification_connection_accept: value },
      (err, doc) => {
        if (err) {
          res.status(400).json({
            success: false,
            msg: "error changing notification settings",
          });
        }
        console.log(doc);
        res.status(200).json({
          success: true,
          msg: "Notification Settings  Changed SuccessFully",
        });
      }
    );
  }
  if (type == "connection_send") {
    User.findByIdAndUpdate(
      req.user.user_id,
      { connection_connection_send: value },
      (err, doc) => {
        if (err) {
          res.status(400).json({
            success: false,
            msg: "error changing notification settings",
          });
        }
        console.log(doc);
        res.status(200).json({
          success: true,
          msg: "Notification Settings  Changed SuccessFully",
        });
      }
    );
  }
};

exports.changePassword = (req, res) => {
  User.findOne({ _id: req.user.user_id }, (err, user) => {
    if (!user)
      return res.status(200).json({
        success: false,
        message: "Auth failed, email not found",
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(200).json({
          success: false,
          message: "Passwords do not match!",
        });
      } else {
        user.password = req.body.password_new;
        user.save();
        return res.status(200).json({
          success: true,
          message: "Passwords changed",
        });
      }
    });
  });
};

exports.setPassword = (req, res) => {
  // we need id and new password
  User.findOne({ _id: req.body.user_id })
    .then((user) => {
      user.password = req.body.password;
      user
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Password changed",
          });
        })
        .catch(() => {
          res
            .status(400)
            .json({ success: false, msg: "cant save the user password" });
        });
    })
    .catch(() => {
      res.status(400).json({ success: false, msg: "cant find the user" });
    });
};

exports.getUserSearchResult = (req, res) => {
  User.find({
    full_name: {
      $regex: new RegExp(`^${req.query.query}`),
      $options: "i",
    },
  })
    .sort({ full_name: 1 })
    .then((data) => {
      const result = [];

      User.findById(req.user.user_id)
        .then((user) => {
          data.map((dataUser) => {
            const isFollowing = user.following.includes(dataUser._id);
            let mutual = 0;
            dataUser.following.map((following) => {
              if (user.following.includes(following)) {
                mutual = mutual + 1;
              }
            });
            result.push({
              id: dataUser._id,
              name: dataUser.full_name,
              isFollowing: isFollowing,
              mutual: mutual,
            });
          });
          resultData = req.query.show == "all" ? result : result.slice(0, 5);
          res.status(200).json(resultData);
        })
        .catch((err) => {
          // console.log(err);
          res
            .status(400)
            .json({ success: false, msg: "cant search the Logged In User" });
        });
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json({ success: false, msg: "cant search the user" });
    });
};

exports.getUserData = (req, res) => {
  var token = req.body.token;
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, "secret", function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ success: false, message: "Failed to authenticate token." });
    req.user = {};
    req.user.user_id = decoded;
    User.findById(req.user.user_id)
      .then((data) => {
        console.log(data);
        const user = {
          id: data._id,
          name: data.full_name,
          email: data.user_email_id,
        };
        res.status(200).json(user);
      })
      .catch((err) => {
        // console.log(err);
        res
          .status(400)
          .json({ success: false, msg: "error getting information of user" });
      });
  });
};

exports.addIpToBlacklist = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      user.blacklisted_ip.push(req.params.ipAddress);
      user.save((err, user) => {
        if (err) {
          return res
            .status(400)
            .json({ success: false, msg: "error adding user to blacklist" });
        }

        res.json(user);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};



exports.addUserNameToExistingUser= async (req, res)=>{
  const users = await User.find({});

  users.map(async user => {
    if(!(user.username)){
     
      if(user.token){
          const username = user.full_name + user.token[user.token.length - 1] + user.token[user.token.length - 2]
    
       const user_ = await User.findByIdAndUpdate(user._id , {$set : {username : username}} , {new : true})
      }
      
    }
    
  })

  res.send('done')

 
}