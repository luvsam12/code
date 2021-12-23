var connection = require("../config/mysql_db_con");
const Posts = require("../models/post");
const ObjectId = require("mongodb").ObjectID;
const Users = require("../models/user");
const Comments = require("../models/comment");
const ReplyComments = require("../models/commentreply");
const Reports = require("../models/report");
const Notifications = require("../models/notification");
const ViewDetails = require("../models/viewdetails");

exports.increaseViews = (req, res) => {
  ViewDetails.findOne({
    user_id: req.user.user_id,
    post_id: req.params.post_id,
  })
    .then((viewData) => {
      if (viewData) {
        if (viewData.num_of_views < 5) {
          viewData.num_of_views += 1;
          viewData.save().then(() => {
            ViewDetails.aggregate(
              [
                { $match: { post_id: req.params.post_id } },
                {
                  $group: {
                    _id: null,
                    num_of_views: { $sum: "$num_of_views" },
                  },
                },
              ],
              function (err, data) {
                if (err) throw err;
                Posts.findOne({ _id: req.params.post_id }).then((post) => {
                  post.num_of_views = data[0].num_of_views;
                  post.save();
                  res
                    .status(200)
                    .json({ success: true, msg: "Views Increased" });
                });
                // console.log(JSON.stringify(data, undefined, 2));
              }
            );
          });
        } else {
          res.status(200).json({ success: true, msg: "Views Not Increased" });
        }
      } else {
        const viewData = new ViewDetails({
          user_id: req.user.user_id,
          post_id: req.params.post_id,
          num_of_views: 1,
        });
        viewData.save().then(() => {
          ViewDetails.aggregate(
            [
              { $match: { post_id: req.params.post_id } },
              {
                $group: {
                  _id: null,
                  num_of_views: { $sum: "$num_of_views" },
                },
              },
            ],
            function (err, data) {
              if (err) throw err;
              Posts.findOne({ _id: req.params.post_id }).then((post) => {
                post.num_of_views = data[0].num_of_views;
                post.save();
                res.status(200).json({ success: true, msg: "Views Increased" });
              });
            }
          );
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: true, msg: "Error in Increasing Views" });
    });
};

//Route to increase share of post
exports.increaseShare = (req, res) => {
  Posts.updateOne(
    { _id: ObjectId(req.params.post_id) },
    { $inc: { num_of_shares: 1 } }
  )
    .then(() => {
      res.status(200).json({ success: true, msg: "Share Increased" });
    })
    .catch((err) =>
      res.status(400).json({ success: false, msg: "can't increase Share" })
    );
};

//Route to turn on notification
exports.postNotifications = (req, res) => {
  Posts.updateOne(
    { _id: ObjectId(req.params.post_id) },
    { $addToSet: { notifications: [req.user.user_id] } }
  )
    .then(() =>
      res.status(200).json({ success: true, msg: "Notification turned on" })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ success: false, msg: "Can't turn on Notifications." })
    );
};

//Route to turn off notification
exports.deleteNotifications = (req, res) => {
  Posts.updateOne(
    { _id: ObjectId(req.params.post_id) },
    { $pull: { notifications: req.user.user_id } }
  )
    .then(() =>
      res.status(200).json({ success: true, msg: "Notification turned Off" })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ success: false, msg: "Can't turn off Notifications." })
    );
};

// To get all Kudos of the particular Post
exports.getPostLike = (req, res) => {
  Posts.find({ _id: ObjectId(req.params.post_id) })
    .then((post) => {
      Users.find({ _id: { $in: post[0].likes } })
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

// To get all users who like the comment
exports.getCommentLike = (req, res) => {
  Comments.find({ _id: ObjectId(req.params.comment_id) })
    .then((comment) => {
      Users.find({ _id: { $in: comment[0].likes } })
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

// To get all users who like the reply comment
exports.getReplyLike = (req, res) => {
  ReplyComments.find({ _id: ObjectId(req.params.reply_comment_id) })
    .then((replycomment) => {
      Users.find({ _id: { $in: replycomment[0].likes } })
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

//To Post Likes on particular Post, comment, reply comment
//To Post Likes on particular Post, comment, reply comment
exports.postLike = (req, res) => {
  const type = req.body.like_type;

  if (type == "Post") {
    Posts.updateOne(
      { _id: ObjectId(req.body.like_id) },
      { $addToSet: { likes: [req.user.user_id] } }
    )
      .then(async () => {
        res.status(200).json({ success: true, msg: "Like Saved in Post" });
        await Posts.findById(req.body.like_id).then((post) => {
          req.body.post_author = post.user_id;
          req.body.notification_user = post.notifications;
          req.body.post_author_name = post.author_name;
        });
        Notifications.findOne({
          post_id: req.body.like_id,
          notification_user_type: "post_owner_like",
        }).then(async (data) => {
          if (!data) {
            const user = [req.body.post_author];

            const msg = `${req.body.author_name} liked the Post`;
            user.map(async (user_id) => {
              await Users.findById(user_id).then((data) => {
                if (data.notification_like == true) {
                  createNotificationRef(
                    req,
                    res,
                    user,
                    msg,
                    "post_owner_like",
                    req.body.like_id
                  );
                }
              });
            });
            return;
          }
          const date = getDate();
          data.count = data.count + 1;
          data.notification_message = `${req.body.author_name} and ${data.count} other liked the Post`;
          data.created_on = date;
          data.user_id.map((user) => {
            Users.findById(user).then((userD) => {
              if (userD.notification_like == true) {
                data
                  .save()
                  .then((data) => {
                    console.log("Notifcation Updated Successfully");
                    userD.unread_notification = userD.unread_notification + 1;
                    userD
                      .save()
                      .then((data) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
        });
        Notifications.findOne({
          post_id: req.body.like_id,
          notification_user_type: "post_user_like",
        }).then(async (data) => {
          if (!data) {
            const user = req.body.notification_user;
            const msg = `${req.body.author_name} liked on ${req.body.post_author_name} Post`;
            user.map(async (user_id) => {
              await Users.findById(user_id).then((data) => {
                if (data.notification_like == true) {
                  user.length > 0 &&
                    createNotificationRef(
                      req,
                      res,
                      user,
                      msg,
                      "post_user_like",
                      req.body.like_id
                    );
                  console.log(user);
                }
              });
            });
            return;
          }
          const date = getDate();

          data.count = data.count + 1;
          data.notification_message = `${req.body.author_name} and ${data.count} other liked on  ${req.body.post_author_name} Post`;
          data.created_on = date;
          data.user_id.map(async (user) => {
            console.log(user);
            await Users.findById(user).then((userD) => {
              if (userD.notification_like == true) {
                data
                  .save()
                  .then((data) => {
                    console.log("Notifcation Updated Successfully");
                    userD.unread_notification = userD.unread_notification + 1;
                    userD
                      .save()
                      .then((data) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
        });
      })
      .catch(
        (err) => console.log(err)
        // res.status(400).json({ success: false, msg: "can't save Like in Post" })
      );
  } else if (type == "Comment") {
    Comments.updateOne(
      { _id: ObjectId(req.body.like_id) },
      { $addToSet: { likes: [req.user.user_id] } }
    )
      .then(async () => {
        res.status(200).json({ success: true, msg: "Like Saved in Comment" });
        await Comments.findById(req.body.like_id).then((comment) => {
          req.body.comment_author = comment.user_id;
          req.body.postId = comment.post_id;
          req.body.comment_author_name = comment.full_name;
        });

        await Posts.findById(req.body.postId).then((post) => {
          req.body.post_author = post.user_id;
        });

        Notifications.findOne({
          post_id: req.body.postId,
          notification_user_type: "post_owner_comment_like",
        }).then(async (data) => {
          if (!data) {
            const user = [req.body.comment_author];
            const msg = `${req.body.author_name} liked the Comment`;
            user.map(async (user_id) => {
              await Users.findById(user_id).then((data) => {
                if (data.notification_like == true) {
                  createNotificationRef(
                    req,
                    res,
                    user,
                    msg,
                    "post_owner_comment_like",
                    req.body.postId
                  );
                }
              });
            });
            return;
          }

          const date = getDate();
          data.count = data.count + 1;
          data.notification_message = `${req.body.author_name} and ${data.count} other liked the Comment on your Post`;
          data.created_on = date;
          data.user_id.map((user) => {
            Users.findById(user).then((userD) => {
              if (userD && userD.notification_like == true) {
                data
                  .save()
                  .then((data) => {
                    console.log("Notifcation Updated Successfully");
                    userD.unread_notification = userD.unread_notification + 1;
                    userD
                      .save()
                      .then((data) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
        });
        Notifications.findOne({
          post_id: req.body.postId,
          notification_user_type: "post_user_comment_like",
        }).then(async (data) => {
          console.log(req.body.postId);
          if (!data) {
            const user = req.body.notification_user
              ? req.body.notification_user
              : [];
            const msg = `${req.body.author_name} liked the Comment`;

            user.map(async (user_id) => {
              await Users.findById(user_id).then((data) => {
                if (data.notification_like == true) {
                  createNotificationRef(
                    req,
                    res,
                    user,
                    msg,
                    "post_user_comment_like",
                    req.body.postId
                  );
                }
              });
            });
            return;
          }

          const date = new Date();
          date.setHours(date.getHours() + 5);
          date.setMinutes(date.getMinutes() + 30);

          data.count = data.count + 1;
          data.notification_message = `${req.body.author_name} and ${data.count} other liked your Comment`;
          data.created_on = date;
          data.user_id.map((user) => {
            Users.findById(user).then((userD) => {
              if (userD.notification_like == true) {
                data
                  .save()
                  .then((data) => {
                    console.log("Notifcation Updated Successfully");
                    userD.unread_notification = userD.unread_notification + 1;
                    userD
                      .save()
                      .then((data) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
        });
      })
      .catch(
        (err) => console.log(err)
        // res
        // 	.status(400)
        // 	.json({ success: false, msg: "can't save Like in Comment" })
      );
  } else if (type == "Reply") {
    ReplyComments.updateOne(
      { _id: ObjectId(req.body.like_id) },
      { $addToSet: { likes: [req.user.user_id] } }
    )
      .then(async () => {
        res.status(200).json({ success: true, msg: "Like Saved in Replies" });

        await ReplyComments.findById(req.body.like_id).then((rep) => {
          req.body.post_id = rep.post_id;
          req.body.comment_author_id = rep.user_id;
        });

        await Posts.findById(req.body.post_id).then((post) => {
          req.body.post_author_id = post.user_id;
        });

        Notifications.findOne({
          post_id: req.body.post_id,
          notification_user_type: "post_owner_reply_like",
        }).then(async (data) => {
          if (!data) {
            const user = [req.body.post_author_id];
            const msg = `${req.body.author_name} liked the Reply on your post`;

            user.map(async (user_id) => {
              await Users.findById(user_id).then((data) => {
                if (data.notification_like == true) {
                  createNotificationRef(
                    req,
                    res,
                    user,
                    msg,
                    "post_owner_reply_like",
                    req.body.post_id
                  );
                }
              });
            });
            return;
          }

          const date = new Date();
          date.setHours(date.getHours() + 5);
          date.setMinutes(date.getMinutes() + 30);

          data.count = data.count + 1;
          data.notification_message = `${req.body.author_name} and ${data.count} other liked the reply on your Post`;
          data.created_on = date;
          data.user_id.map((user) => {
            Users.findById(user).then((userD) => {
              if (userD.notification_like == true) {
                data
                  .save()
                  .then((data) => {
                    console.log("Notifcation Updated Successfully");
                    userD.unread_notification = userD.unread_notification + 1;
                    userD
                      .save()
                      .then((data) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
        });

        Notifications.findOne({
          post_id: req.body.post_id,
          notification_user_type: "post_user_reply_like",
        }).then(async (data) => {
          if (!data) {
            const user = [req.body.post_author_id];
            const msg = `${req.body.author_name} liked your reply`;
            createNotificationRef(
              req,
              res,
              user,
              msg,
              "post_user_reply_like",
              req.body.post_id
            );
            return;
          }

          const date = getDate();

          data.count = data.count + 1;
          data.notification_message = `${req.body.author_name} and ${data.count} other liked the reply`;
          data.created_on = date;
          data.user_id.map((user) => {
            Users.findById(user).then((userD) => {
              if (userD.notification_like == true) {
                data
                  .save()
                  .then((data) => {
                    console.log("Notifcation Updated Successfully");
                    userD.unread_notification = userD.unread_notification + 1;
                    userD
                      .save()
                      .then((data) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
        });
      })
      .catch((err) =>
        res
          .status(400)
          .json({ success: false, msg: "can't save Like in Replies" })
      );
  }
};

// To delete Likes of Particular Post, Comment, Reply Comment
exports.deleteLikes = (req, res) => {
  const type = req.body.like_type;
  if (type == "Post") {
    Posts.updateOne(
      { _id: ObjectId(req.body.like_id) },
      { $pull: { likes: req.user.user_id } }
    )
      .then(() =>
        res.status(200).json({ success: true, msg: "Like deleted in Post" })
      )
      .catch((err) =>
        res
          .status(400)
          .json({ success: false, msg: "can't delete Likes in Post " })
      );
  } else if (type == "Comment") {
    Comments.updateOne(
      { _id: ObjectId(req.body.like_id) },
      { $pull: { likes: req.user.user_id } }
    )
      .then(() =>
        res.status(200).json({ success: true, msg: "Like deleted in Comment" })
      )
      .catch((err) =>
        res
          .status(400)
          .json({ success: false, msg: "can't delete Likes in Comment " })
      );
  } else if (type == "Reply") {
    ReplyComments.updateOne(
      { _id: ObjectId(req.body.like_id) },
      { $pull: { likes: req.user.user_id } }
    )
      .then(() =>
        res.status(200).json({ success: true, msg: "Like deleted in Reply" })
      )
      .catch((err) =>
        res
          .status(400)
          .json({ success: false, msg: "can't delete Likes in Reply " })
      );
  }
};

// To post Boomark for the particular Post
exports.postBookmarks = (req, res) => {
  Users.updateOne(
    { _id: req.user.user_id },
    { $addToSet: { bookmarks: [req.params.post_id] } }
  )
    .then(() =>
      Posts.updateOne(
        { _id: ObjectId(req.params.post_id) },
        { $addToSet: { bookmarks: [req.user.user_id] } }
      )
        .then(() =>
          res.status(200).json({ success: true, msg: "Bookmark Saved" })
        )
        .catch((err) =>
          res.status(400).json({ success: false, msg: "can't Save User" })
        )
    )
    .catch((err) =>
      res.status(400).json({ success: false, msg: "can't Save User" })
    );
};

//To delete bookmark for particular Post
exports.deleteBookmarks = (req, res) => {
  Users.updateOne(
    { _id: req.user.user_id },
    { $pull: { bookmarks: req.params.post_id } }
  )
    .then(() =>
      Posts.updateOne(
        { _id: ObjectId(req.params.post_id) },
        { $pull: { bookmarks: req.user.user_id } }
      )
        .then(() =>
          res.status(200).json({ success: true, msg: "Bookmark deleted" })
        )
        .catch((err) =>
          res.status(400).json({ success: false, msg: "can't delete User" })
        )
    )
    .catch((err) =>
      res.status(400).json({ success: false, msg: "can't delete User" })
    );
};

//Report any post
//Also increase value of report acc. to report type
exports.postReport = (req, res) => {
  const type = req.body.report_type;

  //saving the report in report table
  const report = new Reports({
    user_id: req.user.user_id,
    post_id: req.body.post_id,
    report_type: req.body.report_type,
    additional_comment: req.body.additional_comment,
  });

  report
    .save()
    .then(() => {
      // increasing report type in post
      if (type == "Spam") {
        Posts.updateOne(
          { _id: ObjectId(req.body.post_id) },
          { $inc: { spam: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else if (type == "Inappropriate Content") {
        Posts.updateOne(
          { _id: ObjectId(req.body.post_id) },
          { $inc: { inappropriate_content: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else if (type == "Harassment") {
        Posts.updateOne(
          { _id: ObjectId(req.body.post_id) },
          { $inc: { harassment: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else if (type == "Copyright Issue") {
        Posts.updateOne(
          { _id: ObjectId(req.body.post_id) },
          { $inc: { copyright_issue: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else {
        Posts.updateOne(
          { _id: ObjectId(req.body.post_id) },
          { $inc: { other: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      }
      //check if report type reach the particular limit
      Posts.findOne({ _id: ObjectId(req.body.post_id) })
        .then((post) => {
          if (
            post.spam >= 4 ||
            post.inappropriate_content >= 4 ||
            post.harassment >= 4 ||
            post.copyright_issue >= 4 ||
            post.other >= 4
          ) {
            Posts.updateOne({ _id: ObjectId(req.body.post_id) }, { show: 0 })
              .then(() => {
                res
                  .status(200)
                  .json({ success: true, msg: "Limit reached show = 0" });
              })
              .catch(() => {
                res
                  .status(400)
                  .json({ success: false, msg: "error in updating show = 0" });
              });
          } else {
            res
              .status(200)
              .json({ success: true, msg: "limit not reached so show = 1" });
          }
        })
        .catch(() => {
          res
            .status(400)
            .json({ success: false, msg: "error in finding post" });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "error Reporting post" });
    });
};

//Report any comment
exports.commentreport = (req, res) => {
  const type = req.body.report_type;

  //saving the report in report table
  const report = new Reports({
    post_id: req.body.post_id,
    user_id: req.user.user_id,
    comment_id: req.body.comment_id,
    report_type: req.body.report_type,
    additional_comment: req.body.additional_comment,
  });

  report
    .save()
    .then(() => {
      // increasing report type in post
      if (type == "Spam") {
        Comments.updateOne(
          { _id: ObjectId(req.body.comment_id) },
          { $inc: { spam: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else if (type == "Inappropriate Content") {
        Comments.updateOne(
          { _id: ObjectId(req.body.comment_id) },
          { $inc: { inappropriate_content: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else if (type == "Harassment") {
        Comments.updateOne(
          { _id: ObjectId(req.body.comment_id) },
          { $inc: { harassment: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else if (type == "Copyright Issue") {
        Comments.updateOne(
          { _id: ObjectId(req.body.comment_id) },
          { $inc: { copyright_issue: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else {
        Comments.updateOne(
          { _id: ObjectId(req.body.comment_id) },
          { $inc: { other: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      }
      //check if report type reach the particular limit
      Comments.findOne({ _id: ObjectId(req.body.comment_id) })
        .then((comment) => {
          if (
            comment.spam >= 4 ||
            comment.inappropriate_content >= 4 ||
            comment.harassment >= 4 ||
            comment.copyright_issue >= 4 ||
            comment.other >= 4
          ) {
            Comments.updateOne(
              { _id: ObjectId(req.body.comment_id) },
              { show: 0 }
            )
              .then(() => {
                res
                  .status(200)
                  .json({ success: true, msg: "Limit reached show = 0" });
              })
              .catch(() => {
                res
                  .status(400)
                  .json({ success: false, msg: "error in updating show = 0" });
              });
          } else {
            res
              .status(200)
              .json({ success: true, msg: "limit not reached so show = 1" });
          }
        })
        .catch((err) => {
          res
            .status(400)
            .json({ success: false, msg: "error in finding comment" });
        });
    })

    .catch((err) => {
      res.status(400).json({ success: false, msg: "error Reporting Comment" });
    });
};

//Report for comment reply
exports.replycommentreport = (req, res) => {
  const type = req.body.report_type;

  //saving the report in report table
  const report = new Reports({
    post_id: req.body.post_id,
    user_id: req.user.user_id,
    reply_comment_id: req.body.reply_comment_id,
    report_type: req.body.report_type,
    additional_comment: req.body.additional_comment,
  });

  report
    .save()
    .then(() => {
      // increasing report type in post
      if (type == "Spam") {
        ReplyComments.updateOne(
          { _id: ObjectId(req.body.reply_comment_id) },
          { $inc: { spam: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else if (type == "Inappropriate Content") {
        ReplyComments.updateOne(
          { _id: ObjectId(req.body.reply_comment_id) },
          { $inc: { inappropriate_content: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else if (type == "Harassment") {
        ReplyComments.updateOne(
          { _id: ObjectId(req.body.reply_comment_id) },
          { $inc: { harassment: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else if (type == "Copyright Issue") {
        ReplyComments.updateOne(
          { _id: ObjectId(req.body.reply_comment_id) },
          { $inc: { copyright_issue: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      } else {
        ReplyComments.updateOne(
          { _id: ObjectId(req.body.reply_comment_id) },
          { $inc: { other: 1, reports: 1 } }
        )
          .then(() => {})
          .catch(() => {
            res
              .status(400)
              .json({ success: false, msg: "error increasing report value" });
          });
      }
      //check if report type reach the particular limit
      ReplyComments.findOne({ _id: ObjectId(req.body.reply_comment_id) })
        .then((reply) => {
          if (
            reply.spam >= 4 ||
            reply.inappropriate_content >= 4 ||
            reply.harassment >= 4 ||
            reply.copyright_issue >= 4 ||
            reply.other >= 4
          ) {
            ReplyComments.updateOne(
              { _id: ObjectId(req.body.reply_comment_id) },
              { show: 0 }
            )
              .then(() => {
                res
                  .status(200)
                  .json({ success: true, msg: "Limit reached show = 0" });
              })
              .catch(() => {
                res
                  .status(400)
                  .json({ success: false, msg: "error in updating show = 0" });
              });
          } else {
            res
              .status(200)
              .json({ success: true, msg: "limit not reached so show = 1" });
          }
        })
        .catch(() => {
          res
            .status(400)
            .json({ success: false, msg: "error in finding reply of comment" });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ success: false, msg: "error Reporting reply comment" });
    });
};

exports.postComment = (req, res) => {
  let user_type = "";
  Users.findOne({ _id: req.user.user_id }).then((user) => {
    if (user.is_admin === 1) {
      user_type = "Admin";
    } else if (user.is_instructor === 1) {
      user_type = "Instructor";
    } else {
      user_type = "Student";
    }
    const comment = new Comments({
      post_id: req.params.post_id,
      user_id: req.user.user_id,
      full_name: req.body.author_name,
      user_type: user_type,
      about_user: "",
      comment: req.body.comment,
    });
    comment
      .save()
      .then(() => {
        Posts.updateOne(
          { _id: ObjectId(req.params.post_id) },
          { $inc: { comments: 1 } }
        ).then(() => {});
        res.status(200).json({ success: true, msg: "comment posted" });
      })
      .then(async () => {
        // To create notification for the users

        await Posts.findById(req.params.post_id).then((post) => {
          req.body.post_author = post.author_name;

          req.body.post_author_id = post.user_id;

          req.body.notificationUsers = post.notifications;
        });

        Notifications.findOne({
          post_id: req.params.post_id,
          notification_user_type: "post_owner",
        }).then((doc) => {
          if (!doc) {
            const user = [req.body.post_author_id];
            const message = `${req.body.author_name}  Commented on your post`;
            const type = "post_owner";
            user.map(async (user_id) => {
              await Users.findById(user_id).then(async (data) => {
                console.log("949", data.notification_comment, data.full_name);
                if (data.notification_comment == true) {
                  await createNotificationRef(
                    req,
                    res,
                    user,
                    message,
                    type,
                    req.params.post_id
                  );
                }
              });
            });
          }

          const date = getDate();
          doc.count = doc.count + 1;
          doc.notification_message = `${req.body.author_name} and ${doc.count} other Commented on your post`;
          doc.created_on = date;
          doc.user_id.map((user) => {
            Users.findById(user).then((userD) => {
              if (userD.notification_comment == true) {
                req.user.user_id != req.body.post_author_id &&
                  doc
                    .save()
                    .then((data) => {
                      console.log("Notifcation Updated Successfully");
                      userD.unread_notification = userD.unread_notification + 1;
                      userD
                        .save()
                        .then((data) => {})
                        .catch((err) => {
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
              }
            });
          });
        });

        Notifications.findOne({
          post_id: req.params.post_id,
          notification_user_type: "post_user",
        }).then((doc) => {
          if (!doc && req.body.notificationUsers.length > 0) {
            const date = getDate();
            const user = req.body.notificationUsers;
            const message = `${req.body.author_name}  Commented on ${req.body.post_author} post`;
            const type = "post_user";
            user.map(async (user_id) => {
              await Users.findById(user_id).then((data) => {
                if (data.notification_comment == true) {
                  createNotificationRef(
                    req,
                    res,
                    user,
                    message,
                    type,
                    req.params.post_id
                  );
                  return;
                }
              });
            });
          }

          if (req.body.notificationUsers.length > 0) {
            doc.user_id = req.body.notificationUsers;

            const date = getDate();
            doc.created_on = date;
            doc.count = doc.count + 1;
            doc.notification_message = `${req.body.author_name} and ${doc.count} other Commented on ${req.body.post_author} post`;

            doc.user_id.map((user) => {
              Users.findById(user).then((userD) => {
                if (userD.notification_comment == true) {
                  doc
                    .save()
                    .then((data) => {
                      console.log("Notifcation Updated Successfully");
                      userD.unread_notification = userD.unread_notification + 1;
                      userD
                        .save()
                        .then((data) => {})
                        .catch((err) => {
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              });
            });
          }
        });
      });
  });
};

exports.postReplyComment = (req, res) => {
  let user_type = "";
  Users.findOne({ _id: req.user.user_id }).then((user) => {
    if (user.is_admin === 1) {
      user_type = "Admin";
    } else if (user.is_instructor === 1) {
      user_type = "Instructor";
    } else {
      user_type = "Student";
    }
    const replyComment = new ReplyComments({
      user_id: req.user.user_id,
      full_name: req.body.author_name,
      user_type: user_type,
      about_user: "",
      parent_comment_id: req.body.parent_comment_id,
      comment: req.body.comment,
      post_id: req.params.post_id,
    });
    replyComment
      .save()
      .then(() => {
        Comments.updateOne(
          { _id: ObjectId(req.body.parent_comment_id) },
          { $inc: { num_of_replies: 1 } }
        ).then(() => {});
        Posts.updateOne(
          { _id: ObjectId(req.params.post_id) },
          { $inc: { comments: 1 } }
        ).then(() => {});
        res.status(200).json({ success: true, msg: "Reply comment posted" });
      })
      .then(async () => {
        await Posts.findById(req.params.post_id).then((post) => {
          req.body.post_author = post.author_name;

          req.body.post_author_id = post.user_id;
        });
        Notifications.findOne({
          post_id: req.params.post_id,
          notification_user_type: "reply_post_owner",
        }).then((doc) => {
          if (!doc) {
            const user = [req.body.post_author_id];
            const message = `${req.body.author_name} replied to a  comment on your post`;
            const type = "reply_post_owner";
            user.map(async (user_id) => {
              await Users.findById(user_id).then((data) => {
                if (data.notification_comment == true) {
                  createNotificationRef(
                    req,
                    res,
                    user,
                    message,
                    type,
                    req.params.post_id
                  );
                }
              });
            });
            return;
          }
          const date = getDate();
          doc.count = doc.count + 1;
          doc.notification_message = `${req.body.author_name} and ${doc.count} other replied to a  comment on your post`;
          doc.created_on = date;
          doc.user_id.map((user) => {
            Users.findById(user).then((userD) => {
              if (userD.notification_like == true) {
                doc
                  .save()
                  .then((data) => {
                    console.log("Notifcation Updated Successfully");
                    userD.unread_notification = userD.unread_notification + 1;
                    userD
                      .save()
                      .then((data) => {})
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ success: false, msg: "Error posting reply comment" });
      });

    Notifications.findOne({
      post_id: req.params.post_id,
      notification_user_type: "reply_post_user",
    }).then((doc) => {
      if (!doc) {
        Comments.findById(req.body.parent_comment_id).then((comment) => {
          const user = [comment.user_id];
          const message = `${req.body.author_name} replied to your  comment`;
          const type = "reply_post_user";
          user.map(async (user_id) => {
            await Users.findById(user_id).then(async (data) => {
              if (
                data.notification_comment &&
                data.notification_comment == true
              ) {
                await createNotificationRef(
                  req,
                  res,
                  user,
                  message,
                  type,
                  req.params.post_id
                );
              }
            });
          });
        });
        return;
      }
      const date = getDate();

      doc.count = doc.count + 1;
      doc.notification_message = `${req.body.author_name} and ${doc.count} other replied to your  comment `;
      doc.created_on = date;
      doc.user_id.map((user) => {
        Users.findById(user).then((userD) => {
          if (userD.notification_like == true) {
            doc
              .save()
              .then((data) => {
                console.log("Notifcation Updated Successfully");
                userD.unread_notification = userD.unread_notification + 1;
                userD
                  .save()
                  .then((data) => {})
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      });
    });
  });
};

exports.deleteComment = (req, res) => {
  Comments.deleteOne({ _id: ObjectId(req.params.comment_id) })
    .then(() => {
      // console.log("deleted");
      ReplyComments.deleteMany({
        parent_comment_id: ObjectId(req.params.comment_id),
      }).then(() => {
        res
          .status(200)
          .json({ success: true, msg: "Comments deleted successfully" });
        // console.log("Replies deleted");
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "error deleting comments" });
    });
};

exports.deleteReplyComment = (req, res) => {
  ReplyComments.deleteOne({ _id: ObjectId(req.params.comment_id) })
    .then(() => {
      res
        .status(200)
        .json({ success: true, msg: "Reply deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "error deleting comments" });
    });
};

exports.getParentComments = (req, res) => {
  Comments.find({ post_id: ObjectId(req.params.post_id), show: 1 })
    .then((comments) => {
      res.status(200).json({ success: true, comments: comments });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "error fetching comments" });
    });
};

exports.getReplyComments = (req, res) => {
  ReplyComments.find({
    parent_comment_id: ObjectId(req.params.parent_comment_id),
    show: 1,
  })
    .then((replyComments) => {
      res.status(200).json({ success: true, replyComments: replyComments });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "error fetching replies" });
    });
};

//function  to create a notifications
const createNotificationRef = (req, res, userId, message, type, postId) => {
  const date = getDate();
  const notification = new Notifications({
    user_id: userId,
    post_id: postId,
    notification_message: message,
    notification_user_type: type,
    count: 0,
    created_on: date,
  });
  console.log(userId);
  //post owner should not be notified for his own actions
  req.user.user_id != req.body.post_author &&
    userId.map((user) => {
      if (user != req.user.user_id) {
        notification.save().then((data) => {
          Users.findByIdAndUpdate(
            user,
            {
              $push: { notification: { id: data._id } },
              $inc: { unread_notification: 1 },
            },
            (err) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("Notification Added Successfully");
            }
          );
        });
      }
    });
};

//Function to get the current date
const getDate = () => {
  const date = new Date();
  date.setHours(date.getHours() + 5);
  date.setMinutes(date.getMinutes() + 30);
  return date;
};

exports.getInitialComments = (req, res) => {
  Comments.find({ post_id: ObjectId(req.params.post_id), show: 1 })
    .then((comments) => {
      const id = [];
      const commentsData = comments.slice(0, 5);
      const commentsData2 = comments.slice(5);
      commentsData2.map((comment) => {
        id.push(comment._id);
      });

      res
        .status(200)
        .json({ success: true, comments: commentsData, comments_id: id });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "error fetching comments" });
    });
};

exports.getSelectiveComments = (req, res) => {
  var comments = [];
  req.body.comment_ids.map((id, index) => {
    Comments.findById(id)
      .then((data) => {
        comments.push(data);
      })
      .then(() => {
        if (index == req.body.comment_ids.length - 1) {
          res.json({ success: true, comments: comments });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.json({ success: false, msg: "error fetching comments" });
      });
  });
};

exports.postForumsReplyComment = (req, res) => {
  let user_type = "";
  Users.findOne({ _id: req.user.user_id }).then((user) => {
    if (user.is_admin === 1) {
      user_type = "Admin";
    } else if (user.is_instructor === 1) {
      user_type = "Instructor";
    } else {
      user_type = "Student";
    }
    ReplyComments.findById(req.body.parent_reply_id).then((data) => {
      if (data.depth >= 8) {
        return res.json({ msg: "You cannot  reply more than 8 times " });
      }
      const replyComment = new ReplyComments({
        user_id: req.user.user_id,
        full_name: req.body.author_name,
        user_type: user_type,
        about_user: "",
        parent_comment_id: req.body.parent_comment_id,
        parent_reply_id: req.body.parent_reply_id,
        comment: req.body.comment,
        post_id: req.params.post_id,
        depth: data.depth + 1,
      });
      replyComment.save().then(() => {
        Comments.updateOne(
          { _id: ObjectId(req.body.parent_comment_id) },
          { $inc: { num_of_replies: 1 } }
        ).then(() => {});
        Posts.updateOne(
          { _id: ObjectId(req.params.post_id) },
          { $inc: { comments: 1 } }
        ).then(() => {});
        res.status(200).json({ success: true, msg: "Reply comment posted" });
      });
    });
  });
};

exports.getInitialReplies = (req, res) => {
  ReplyComments.find({
    post_id: req.params.post_id,
    parent_comment_id: req.params.comment_id,
  })

    .then((data) => {
      const id = [];
      const replyData = data.slice(0, 5);
      const replyData2 = data.slice(5);
      replyData2.map((comment) => {
        id.push(comment._id);
      });
      res.json({ success: true, replies: replyData, replies_ids: id });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, msg: "error fetching comments" });
    });
};

exports.getSelectiveReplies = (req, res) => {
  var replies = [];
  req.body.reply_ids.map((id, index) => {
    console.log(id);
    ReplyComments.findById(id)
      .then((data) => {
        replies.push(data);
      })
      .then(() => {
        if (index == req.body.reply_ids.length - 1) {
          res.json({ success: true, replies: replies });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.json({ success: false, msg: "error fetching replies" });
      });
  });
};

exports.getChildReplies = (req, res) => {
  ReplyComments.find({ parent_reply_id: req.body.parent_reply_id })
    .then((data) => {
      res.json({ success: true, replies: data });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, msg: "error fetching replies" });
    });
};
