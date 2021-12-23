const express = require("express");
const router = express.Router();

//Controller functions
const { getAllCategory } = require("../controllers/category.js");

//Route to fetch all categories
router.get("/categories", getAllCategory);


module.exports = router;
