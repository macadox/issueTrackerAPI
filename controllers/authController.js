const crypto = require('crypto');
const { promisify } = require('util');
const JWT = require('jsonwebtoken');

const User = require('./../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Email = require('../utils/Email');
const { hash } = require('bcryptjs');

const sendToken = (user, statusCode, res, message) => {
  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    exipres: new Date(
      // Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 3600 * 1000
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000
    ),
    httpOnly: true,
  };

  // if (process.env.NODE_ENV === 'production') {
  //   cookieOptions.secure = true;
  // }
  // Attach cookie to the response object.
  res.cookie('jwt', token, cookieOptions);
  // Remove pw from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      user: user,
    },
    message,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = newUser.generateUserConfirmationToken();
  // save token in the user obj
  await newUser.save({ validateBeforeSave: false });

  const url = `${req.protocol}://${req
    .get('host')
    .replace(/\d+$/, process.env.FRONT_PORT)}/signup/${token}`;

  await new Email(newUser, url).sendWelcome();

  res.status(200).json({
    status: 'success',
    message: 'Confirmation token has been sent!',
  });
});

exports.confirmSignup = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    userConfirmationToken: hashedToken,
  });

  if (!user) {
    return next(
      new AppError('Invalid token or user has already been confirmed!')
    );
  }

  user.active = true;
  user.userConfirmationToken = undefined;

  await user.save({ validateBeforeSave: false });
  res.redirect(308, '/');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password +active');
  // 2) Check if user exists && password is correct
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  if (!user.active) {
    return next(new AppError('User not active, please confirm the email.'));
  }

  // 3) IF everything is ok, send token to client
  sendToken(user, 200, res, 'Logged in successfully');
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1 Getting the token and checking if its there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('Authentication failed. Please log in again!', 401)
    );
  }

  // 2. Verify the token
  const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('The user no longer exists!'), 401);
  }
  // 4. Check if user changed password after token was issued.
  if (freshUser.checkPasswordChangedAfterIat(decoded.iat)) {
    // return an error
    return next(
      new AppError(
        'The user has changed the password. Please log in again!',
        401
      )
    );
  }
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});

// TODO: Is logged in function, used in viewsRoutes to set res.locals.user to currentUser
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const token = req.cookies.jwt;

      const decoded = await promisify(JWT.verify)(
        token,
        process.env.JWT_SECRET
      );

      const freshUser = await User.findById(decoded.id);
      if (!freshUser) {
        return next();
      }
      if (freshUser.checkPasswordChangedAfterIat(decoded.iat)) {
        // return an error
        return next();
      }
      res.locals.user = freshUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

exports.restrict = (...roles) => (req, res, next) => {
  const userRoles = req.user.roles;

  if (!roles.find((role) => userRoles.includes(role))) {
    return next(
      new AppError('You do not have permission for this action', 403)
    );
  }
  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on the POST request
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('Invalid email address', 404));

  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send message with resetURL to user by email...
  const url = `${req.protocol}://${req
    .get('host')
    .replace(
      /\d+$/,
      process.env.FRONT_PORT
    )}/api/v1/users/resetPassword/${resetToken}`;

  try {
    await new Email(user, url).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Token has been sent!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error while sending the email', 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const encodedToken = crypto
    .createHash('SHA256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: encodedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) Iftoken has not expired andthere is user, set the new password
  if (!user) next(new AppError('Token is invalid or has expired', 400));
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  if (!user.active) user.active = true;
  // 3) Upadte changedPasswordAt property of the user
  await user.save();
  // 4) Log the user in, send JWT
  sendToken(user, 200, res, 'Password reset successfully');
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (
    !user ||
    !(await user.checkPassword(req.body.currentPassword, user.password))
  ) {
    return next(new AppError('Current password is wrong!', 401));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  sendToken(user, 200, res, 'Password changed successfully');
});
