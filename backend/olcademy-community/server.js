require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

//initializing app with express
const app = express();

//Database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch(() => {
    console.log("DB Not Connected!");
  });

// const { sendEmail } = require('./Nodemailer/mail');
const { sendEmail } = require("./mailes/mail");

//All middlwares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(passport.initialize());
app.use(cookieParser());

//all routes comes here
app.use("/api", require("./routes/category"));
app.use("/api", require("./routes/testcategory"));
app.use("/api", require("./routes/test"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/post"));
app.use("/api", require("./routes/postactions"));
app.use("/api", require("./routes/network"));
app.use("/api", require("./routes/myfeeds.js"));

const port = process.env.PORT;
const server = app.listen(process.env.PORT || 3000, () =>
  console.log(`Server Started listening on port ${process.env.PORT}!`)
);
