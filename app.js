const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const authController = require('./controllers/authController');
const globalErrorHandler = require('./controllers/errorHandler');
const AppError = require('./utils/appError');

// const issueRouter = require('./routes/issueRoutes');
const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
// const viewsRouter = require('./routes/viewsRoutes');

console.log(process.env.NODE_ENV);

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:9000', 'http://localhost:1234'],
    credentials: true,
  })
);

app.use(morgan('dev'));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(mongoSanitize());
app.use(xss());

// Helpers
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// app.use('/api/v1/issues', issueRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
// app.use('/', viewsRouter);

app.use(globalErrorHandler);

module.exports = app;
