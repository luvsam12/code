const TestCategory = require("../models/testcategory");

// Test Categories
exports.getTestCategory = (req, res) => {
    TestCategory.find()
    .then((categories)=>{
      res.send(categories)
    })
    .catch((err)=>{
      return res.status(400).json({
        error: "NO test categories Found",
      });
    })
  };
  