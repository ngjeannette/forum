const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, trim: true },
    password: { type: String, required: false },
}, { timestamps: true })

const User = mongoose.model('UserForum', userSchema);
module.exports = User;