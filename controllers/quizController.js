const Quiz = require('../models/Quiz');

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createQuiz = async (req, res) => {
  const { question, options, correctAnswer } = req.body;

  try {
    const quiz = new Quiz({
      question,
      options,
      correctAnswer,
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
