const Test = require('../models/Test');
const Quiz = require('../models/Quiz');

exports.startTest = async (req, res) => {
  const { userId } = req.body;

  try {
    const questions = await Quiz.aggregate([{ $sample: { size: 10 } }]);

    const test = new Test({
      user: userId,
      questions: questions.map(q => q._id), 
      score: 0,
      passed: false,
    });

    await test.save();

    const questionsToSend = questions.map(({ _id, question, options }) => ({
      _id,
      question,
      options,
    }));

    res.status(201).json({
      testId: test._id,
      questions: questionsToSend,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitTest = async (req, res) => {
  const { testId, answers } = req.body;

  try {
    const test = await Test.findById(testId).populate('questions');

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    let score = 0;
    test.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    test.score = score;
    test.passed = score >= (test.questions.length / 2); 
    await test.save();

    res.json({
      score: test.score,
      passed: test.passed,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
