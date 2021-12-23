const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  var token = req.headers["authorization"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, "secret", function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    req.user = {};
    req.user.user_id = decoded;
    next();
  });
}

module.exports = auth;
