const express = require("express");
const app = express();
const multerS3 = require("multer-s3");
const cors = require("cors");
const mongoose = require("mongoose");
const AWS = require("aws-sdk");
const multer = require("multer");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.BUCKET_REGION,
});

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// user Schema
const User = require("./models/users.model");

// create user
app.post("/signup", function (req, res) {});
// check duplicate if username has been used
app.get("/checkduplicatesignup", function (req, res) {
  const {
    query: { username, password },
  } = req;
  User.find({ username })
    .then((info) => {
      if (info.length > 0) {
        // there is a duplicate, return user already exists
        return res.json("User already exists");
      } else {
        // there is no duplicate, create user return user created
        const newUser = new User({
          username,
          password,
        });
        newUser
          .save()
          .then(() => res.json("User Added"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err, "checkduplicatesignup"));
});
// login
app.get("/login", function (req, res) {
  const {
    query: { username, password },
  } = req;
  User.find({ username, password })
    .then((info) => {
      if (info.length > 0) {
        return res.json(info);
      } else {
        return res.json("Wrong Info");
      }
    })
    .catch((err) => console.log(err, "login"));
});

// Question Schema
const Schema = mongoose.Schema;
const questionSchema = new Schema(
  {
    userID: String,
    question: String,
    username: String,
    image: [],
  },
  { timestamps: true }
);
const Question = mongoose.model("QuestionForum", questionSchema);

// Answer Schema
const answerSchema = new Schema(
  {
    questionID: String,
    questionUserID: String,
    answerUserID: String,
    answer: String,
    answerUsername: String,
    liked: Boolean,
    image: [],
  },
  { timestamps: true }
);
const Answer = mongoose.model("AnswerForum", answerSchema);
// Upload image
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
// create question
app.post("/createQ", upload.array("image", 1), function (req, res, next) {
  const {
    body: { userID, question, username },
  } = req;
  const newQuestion = new Question({
    userID,
    question,
    username,
    image: req.files,
  });
  console.log("newQuestion", newQuestion);
  newQuestion
    .save()
    .then((info) => res.json(info))
    .catch((err) => res.status(400).json("errorPOST" + err));
});
// display questions user created
app.get("/getUserQ", function (req, res) {
  const {
    query: { userID },
  } = req;
  Question.find({ userID })
    .then((info) => res.json(info))
    .catch((err) => console.log(err, "userQerror"));
});
// dispaly individaul question
app.get("/getindividualQ", function (req, res) {
  const {
    query: { _id },
  } = req;
  Question.find({ _id })
    .then((info) => {
      // info holds the info
      res.json(info);
      // answer database
    })
    .catch((err) => console.log(err, "getindividualQ"));
});
// remove individual question
app.post("/removeIndividualQ", function (req, res) {
  const {
    body: { _id },
  } = req;
  Question.deleteOne({ _id })
    .then((info) => res.json("Question Removed"))
    .catch((err) => console.log(err, "removeIndividualQ"));
});
// display all question created
app.get("/getDisplayAll", function (req, res) {
  Question.find({})
    .then((info) => res.json(info))
    .catch((err) => console.log(err, removieIndividualQ));
});
// create answer to question
app.post("/createAnswer", upload.array("image", 1), function (req, res, next) {
  const {
    body: {
      questionID,
      questionUserID,
      answerUsername,
      answerUserID,
      answer,
      liked,
    },
  } = req;
  const newAnswer = new Answer({
    questionID,
    questionUserID,
    answerUserID,
    answer,
    answerUsername,
    liked,
    image: req.files,
  });
  newAnswer
    .save()
    .then((info) => res.json(info))
    .catch((err) => res.status(400).json("errorPOST" + err));
});
// display all answer to one individual question
app.get("/getAnswer", function (req, res) {
  const {
    query: { questionID },
  } = req;
  Answer.find({ questionID })
    .then((info) => res.json(info))
    .catch((err) => console.log(err, "getAnswer"));
});
// update answer liked
app.post("/updateLiked", function (req, res) {
  const {
    body: { _id, liked },
  } = req;
  Answer.findOneAndUpdate({ _id }, { liked })
    .then((info) => res.json(info))
    .catch((err) => console.log(err, "updateLiked"));
});

// REMOVE
//remove answer documents in collection
app.post("/removeanswers", function (req, res) {
  Answer.remove({})
    .then((info) => console.log("removed"))
    .catch((err) => console.log(err, "removeanswer"));
});
// remove quesiton documents in collection
app.post("/removequestions", function (req, res) {
  Question.remove({})
    .then((info) => console.log("removed"))
    .catch((err) => console.log(err, "removeanswer"));
});
// check if local or in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
