const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    userID: String,
    question: String,
    image: [],
}, { timestamps: true })

const Question = mongoose.model('QuestionForum', questionSchema);
module.exports = Question;