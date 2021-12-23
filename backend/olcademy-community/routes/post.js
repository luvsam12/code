const express = require("express");
const router = express.Router();
const { storage, upload, uploadImages } = require("../config/postfileuploads");

//middleware function
const auth = require("../middleware/auth");

//Controller functions
const {
	getBlogs,
	getForums,
	getSinglePost,
	createPost,
	deletePost,
	updatePost,
	getPostByCategory,
	getRecommendation,
	sharePost,
	getSearchPostTitle,
} = require("../controllers/post.js");

//Route to get blogs
router.get("/blog", getBlogs);

//Route to get forums
router.get("/forums", getForums);

//Route for uploading files

router.post("/uploadImages", auth, upload.array("media"), uploadImages);

// Route for uploading Videos
// router.post("/uploadVideos", auth, upload.array("media"), uploadVideos);

//Route for uploading Documents
// router.post("/uploadDocuments", auth, upload.array("media"), uploadDocuments);

router.post("/uploadImages", upload.array("media"), uploadImages);

// router.post("/uploadImages", upload.array("media"), uploadImages);

//Route to get blogs
router.post("/post/", getSinglePost);

//Route to get blogs by category
router.get("/:category_name/posts", getPostByCategory);

//Route to post a blog
router.post("/createPost", auth, upload.array("media"), createPost);

//Route to delete a blog
router.delete("/post/:post_id", auth, deletePost);

//Route to update a blog
router.put("/post/:post_id", auth, upload.array("media"), updatePost);

// Route to get popularity based blogs
router.get("/getpopularblogs", auth, getRecommendation);

//Route to share a post
router.post("/share/:post_id", auth, sharePost);

//Route to get post_title on search
router.get("/search", getSearchPostTitle);

module.exports = router;
