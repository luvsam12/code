const Category = require("../models/category");

exports.getAllCategory = (req, res) => {
  Category.find()
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "NO categories Found",
      });
    });
};


