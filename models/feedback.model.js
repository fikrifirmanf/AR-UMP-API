const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const feedbackSchema = new mongoose.Schema({
    nim: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    typeFeedback: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
});


module.exports = mongoose.model("Feedback", feedbackSchema);