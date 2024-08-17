const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Quiz', QuizSchema);
