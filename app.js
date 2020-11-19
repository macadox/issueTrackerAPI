const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const globalErrorHandler = require('./controllers/errorHandler');
const AppError = require('./utils/appError');

// const issueRouter = require('./routes/issueRoutes');
const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const viewsRouter = require('./routes/viewsRoutes');

console.log(process.env.NODE_ENV);

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log('Hello from the middleware in express app');
  console.log(res.cookies);
  next();
});

// app.use('/api/v1/issues', issueRouter);
app.use('/', viewsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
