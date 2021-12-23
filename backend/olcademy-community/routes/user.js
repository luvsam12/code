const express = require("express");
const router = express.Router();
const { storage, upload } = require("../config/postfileuploads");
const passport = require("passport");
const passportSetup = require("../config/socialAuth");

//middleware function
const auth = require("../middleware/auth");

//Controller functions
const {
  addUserNameToExistingUser,
  getUserInterest,
  postUserDocument,
  postUserInterest,
  postSingleInterest,
  deleteSingleInterest,
  postFollow,
  deleteFollow,
  getKudos,
  getAllPost,
  getBookmarks,
  postconnectionrequest,
  postconnection,
  deleteconnectionrequest,
  deleteconnection,
  saveNotification,
  getNotifications,
  getUserPersonalDetails,
  updateUserPersonalDetailsFirst,
  updateUserPersonalDetailsSecond,
  changeProfileImage,
  getSkills,
  updateSkills,
  postSkills,
  deleteSkills,
  getExperience,
  postExperience,
  updateExperience,
  deleteExperience,
  getEducation,
  postEducation,
  updateEducation,
  deleteEducation,
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  getProfileImage,
  abc,
  getResearch,
  postResearch,
  updateResearch,
  deleteResearch,
  getCertificate,
  postCertificate,
  updateCertificate,
  deleteCertificate,
  verifyEmail,
  getSocial,
  updateSocial,
  postSocial,
  deleteSocial,
  readNotification,
  changePushNotificationSettings,
  changePassword,
  setPassword,
  checkToken,
  getUserSearchResult,
  getUserData,
  addIpToBlacklist,
} = require("../controllers/user.js");
const { request } = require("express");
const { route } = require("./postactions");
const user = require("../models/user");
const ipVerification = require("../controllers/ipverification");

router.get("/abc", abc);

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", ipVerification, loginUser);

router.get("/logout", auth, logoutUser);

//forgot password
router.post("/forgotPassword", forgotPassword);

//check forgot password token
router.post("/checkToken/:token", checkToken);

//change password using forgot password
router.put("/setPassword", setPassword);

//email verification
router.get("/verify/:token", verifyEmail);

//google Login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//google callback
router.get(
  "/auth/google/olcademy",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    authdata = {
      user_id: req.user._id,
      full_name: req.user.full_name,
    };
    res.cookie("w_auth", req.user.token).status(200).json({
      loginSuccess: true,
      token: req.user.token,
      authdata,
    });
  }
);

// router.get("/abc", auth, abc);

//Get Show interest Popup value
router.get("/user", auth, postUserDocument);

//Get User Profile Image Route
router.get("/userProfileImg/:user_id", getProfileImage);

//User Interets Routes
router.get("/userInterest", auth, getUserInterest);
router.post("/userInterest", auth, postUserInterest);
router.post("/userInterest/:interest_id", auth, postSingleInterest);
router.delete("/userInterest/:interest_id", auth, deleteSingleInterest);

//Post User follow
router.post("/follow/:other_user_id", auth, postFollow);

//Delete User follow
router.delete("/unfollow/:other_user_id", auth, deleteFollow);

//Get all post by user
router.get("/yourPost", auth, getAllPost);

//Route to get bookmarks
router.get("/bookmarks", auth, getBookmarks);

//Route to get kudos of user
router.get("/allkudos", getKudos);

// Send connection request
router.post("/connect/request", auth, postconnectionrequest);

//Accept connect request
router.post("/connect/accept", auth, postconnection);

//Reject connection request
router.put("/connect/cancel", auth, deleteconnectionrequest);

//Disconnect user
router.put("/connect/disconnect", auth, deleteconnection);

//Get all notifications of user
router.get("/notifications", auth, getNotifications); 

//Route to Read a Notification
router.get("/notifications/read/:notificationId", auth, readNotification);

//Route to get bookmarks
router.post("/saveNotification", auth, saveNotification);

//Route to get user personal details
router.get("/userDetails/:user_id",auth, getUserPersonalDetails);

//Route to update user details half part
router.put("/userDetailsfirst", auth, updateUserPersonalDetailsFirst);

//Route to update user details other half
router.put("/userDetailssecond", auth, updateUserPersonalDetailsSecond);

//Route to change profile image
router.put("/profileImage", auth, upload.array("media"), changeProfileImage);

//Route to post user skills
router.post("/skills", auth, postSkills);

//Route to get user skills
router.get("/skills/:user_id", auth, getSkills);

//Route to get user skills
router.put("/skills", auth, updateSkills);

//Route to delete skill
router.delete("/skills/:skill_id", auth, deleteSkills);

//Route to get user Experience
router.get("/experience/:user_id", auth, getExperience);

//Route to post user Experience
router.post("/experience", auth, postExperience);

//Route to post user Experience
router.put("/experience", auth, updateExperience);

//Route to delete user Experience
router.delete("/experience/:experience_id", auth, deleteExperience);

//Route to get user Education
router.get("/education/:user_id", auth, getEducation);

//Route to post user Education
router.post("/education", auth, postEducation);

//Route to post user Education
router.put("/education", auth, updateEducation);

//Route to delete user Education
router.delete("/education/:education_id", auth, deleteEducation);

//Route to get user Research
router.get("/research/:user_id", auth, getResearch);

//Route to post user Research
router.post("/research", auth, postResearch);

//Route to post user Research
router.put("/research", auth, updateResearch);

//Route to delete user Research
router.delete("/research/:research_id", auth, deleteResearch);

//Route to get user Certificate
router.get("/certificate/:user_id", auth, getCertificate);

//Route to post user Certificate
router.post("/certificate", auth, postCertificate);

//Route to post user Certificate
router.put("/certificate", auth, updateCertificate);

//Route to delete user Certificate
router.delete("/certificate/:certificate_id", auth, deleteCertificate);

//Route to get user Social Profile
router.get("/social_profile/:user_id", auth, getSocial);

//Route to post user Social Profile
router.post("/social_profile", auth, postSocial);

//Route to post user Social Profile
router.put("/social_profile", auth, updateSocial);

//Route to delete user Social Profile
router.delete("/social_profile/:social_id", auth, deleteSocial);

// Route to change user's Password
router.put("/changePassword", auth, changePassword);

//Route to turn off notification from user settings
router.put("/user/notification", auth, changePushNotificationSettings);

router.get("/search/user", auth, getUserSearchResult);
router.post("/user/data", auth, getUserData);

router.get("/block/:ipAddress/:userId", addIpToBlacklist);

router.get('/assignUsername' , addUserNameToExistingUser)

module.exports = router;
