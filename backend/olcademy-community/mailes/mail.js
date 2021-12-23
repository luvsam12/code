const mailer = require("nodemailer");
const { forgotPassword } = require("./forgotPassword");
const { emailVerification } = require("./emailVerification");
const { ipVerification } = require("./ipVerification");

// const { Otpchange } = require('./passwordotp');
// const { Welcome } = require('./welcome');

const getEmailData = (to, link, template) => {
  let data = null;

  switch (template) {
    case "forgotPassword":
      data = {
        from: "Olcademy <Olcademy@gmail.com>",
        to,
        subject: "Welcome",
        html: forgotPassword(link),
      };
      break;

    case "emailVerification":
      data = {
        from: "Olcademy <Olcademy@gmail.com>",
        to,
        subject: `Email Verification`,
        html: emailVerification(link),
      };
      break;
    case "ipVerification":
      data = {
        from: "Olcademy <Olcademy@gmail.com>",
        to,
        subject: `Ip verification`,
        html: ipVerification(link),
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, type) => {
  const smtpTransport = mailer.createTransport({
    port: 535,
    secure: false,
    service: "Gmail",
    auth: {
      user: "agrawalji295@gmail.com",
      pass: "mnaamnaa11",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mail = getEmailData(to, name, type);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log("email not sent");
      console.log(error);
    } else {
      console.log(" email sent successfully");
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
