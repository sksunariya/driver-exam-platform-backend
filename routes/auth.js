const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authRoute = express.Router();

authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);

module.exports = authRoute;
