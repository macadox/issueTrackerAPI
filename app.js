const path = require('path');
const express = require('express');
// const cors = require('cors');
const helmet = require('helmet');
const csp = require('express-csp-header');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const authController = require('./controllers/authController');
const globalErrorHandler = require('./controllers/errorHandler');
const AppError = require('./utils/appError');

const issueRouter = require('./routes/issueRoutes');
const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');

console.log(process.env.NODE_ENV);

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'blob: data:'],
    },
  })
);
// app.use(
//   cors({
//     origin: ['http://localhost:8081'],
//     credentials: true,
//   })
// );

app.use(morgan('dev'));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));
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

app.use('/api/v1/issues', issueRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(globalErrorHandler);

module.exports = app;
