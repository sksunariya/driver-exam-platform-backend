const express = require('express');
const { getQuizzes, createQuiz } = require('../controllers/quizController');
const {protect} = require('../middlewares/authMiddleware');
const quizRoute = express.Router();

quizRoute.get('/getQuiz', protect, getQuizzes);
quizRoute.post('/postQuiz', protect, createQuiz);

module.exports = quizRoute;
