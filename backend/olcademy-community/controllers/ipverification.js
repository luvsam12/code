const { sendEmail } = require("../mailes/mail");
const Users = require("../models/user");

const getIpAddress = (req, res, next) => {
  if (req.body.ip) {
    const ipAddress = req.body.ip;
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user.ip_addresses.includes(ipAddress)) {
        sendEmail(
          req.body.email,
          { ipAddress: ipAddress, user: user._id },
          "ipVerification"
        );
      }
    });
  }
  next();
};

module.exports = getIpAddress;
