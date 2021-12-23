const User = require("../models/user");

function ipVerify(req, res, next) {
  const ip = req.body.ip_address;
  User.findOne({ email: req.body.email }).then((user) => {
    if (user.blacklisted_ip.includes(ip)) {
      return res.status(500).send({
        auth: false,
        message: "this IP address is blocked by the user.",
      });
    }
    next();
  });
}

module.exports = ipVerify;
