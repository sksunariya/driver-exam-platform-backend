const express = require('express');
const { startTest, submitTest } = require('../controllers/testController');
const  {protect}  = require('../middlewares/authMiddleware');
const testRoute = express.Router();

testRoute.post('/start', protect, startTest);
testRoute.post('/submit', protect, submitTest);

module.exports = testRoute;
