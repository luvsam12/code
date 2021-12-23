const express = require("express");
const router = express.Router();

//Controller functions
const { getTestCategory } = require("../controllers/testcategory");

// Test Categories
router.get("/testcategories", getTestCategory);

module.exports = router;
