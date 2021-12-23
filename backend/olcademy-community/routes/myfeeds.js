const express = require("express");
const router = express.Router();

//middleware function
const auth = require("../middleware/auth");

//Controller functions
const { getRecommendation, getFeeds } = require("../controllers/myfeeds.js");

//Route to fetch all categories
router.get("/myfeed:post_type", auth, getRecommendation);

router.get("/feeds", auth, getFeeds);


module.exports = router;
