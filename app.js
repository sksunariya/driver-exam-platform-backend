const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const quizRoute = require('./routes/quiz');
const testRoute = require('./routes/test');

dotenv.config();
connectDB();

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/quizzes', quizRoute);
app.use('/api/v1/tests', testRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
