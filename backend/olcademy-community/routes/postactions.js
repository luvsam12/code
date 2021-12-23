const express = require("express");
const router = express.Router();

//middleware function
const auth = require("../middleware/auth");

//Controller functions
const {
  increaseViews,
  increaseShare,
  postNotifications,
  deleteNotifications,
  getPostLike,
  getCommentLike,
  getReplyLike,
  postLike,
  deleteLikes,
  postBookmarks,
  deleteBookmarks,
  postComment,
  postReplyComment,
  getParentComments,
  getReplyComments,
  deleteComment,
  deleteReplyComment,
  postReport,
  commentreport,
  replycommentreport,
  getInitialComments,
  getSelectiveComments,
  postForumsReplyComment,
  getInitialReplies,
  getSelectiveReplies,
  getChildReplies,
} = require("../controllers/postactions.js");

//Route to increase the views of blog
router.put("/views/:post_id", auth, increaseViews);

//Route to increase share of post
router.put("/share/:post_id", auth, increaseShare);

//Route to turn Notifications on for a blog
router.put("/notification/:post_id", auth, postNotifications);

//Route to turn Notifications off for a blog
router.delete("/notification/:post_id", auth, deleteNotifications);

//Route to get post kudos
router.get("/likePost/:post_id", getPostLike);

//Route to get comment like users
router.get("/likeComment/:comment_id", getCommentLike);

//Route to get reply comment like users
router.get("/likeReplyComment/:reply_comment_id", getReplyLike);

//Route to post kudos*
router.post("/like", auth, postLike);

//Route to delete kudos
router.put("/like", auth, deleteLikes);

//Route to post bookmarks
router.post("/bookmarks/:post_id", auth, postBookmarks);

//Route to delete Bookmarks
router.delete("/bookmarks/:post_id", auth, deleteBookmarks);

//Route to post comment
router.post("/comment/:post_id", auth, postComment);

//Route to post reply comment
router.post("/replyComment/:post_id", auth, postReplyComment);

//Route to post  reply comment to a reply
router.post("/replyComment/reply/:post_id", auth, postForumsReplyComment);

//Route to get all comments comment
router.get("/comments/:post_id", getParentComments);

// Route to get initial comment reply
router.get("/replycomments/:post_id/:comment_id", getInitialReplies);

//Route To get selective forums comment
router.put("/forums/comments", getSelectiveComments);

//Route to get initial comment
router.get("/forums/comments", getInitialComments);

//Route To get selective forums reply
router.put("/forums/reply", getSelectiveReplies);

//Route to get child Replies
router.put("/commentreply/:parent_reply_id", getChildReplies);

//Route to get all reply to parent comment
router.get("/comments/replies/:parent_comment_id", getReplyComments);

//Route to delete any comment
router.delete("/comment/:comment_id", auth, deleteComment);

//Route to delete reply comment
router.delete("/comment/reply/:comment_id", auth, deleteReplyComment);

//Route to report any post
router.post("/report/post", auth, postReport);

//Route to report any parent comment
router.post("/report/comment", auth, commentreport);

//Route to report any reply comment
router.post("/report/reply_comment", auth, replycommentreport);

module.exports = router;
