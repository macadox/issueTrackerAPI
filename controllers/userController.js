const User = require('../models/userModel');
const factory = require('./factory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  for (let key in obj) {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, {path: 'projects'});
exports.createUser = factory.createOne(User);
// update User is restricted to admin, needs its own middleware, that allows hooks to run
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('No user with that id!', 404));

  for (let key in req.body) {
    user[key] = req.body[key];
  }
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
exports.deleteUser = factory.deleteOne(User);

exports.updateDetails = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword)
    return next(
      new AppError(
        'This route is not for changing passwords, plase use /updatePassword'
      )
    );

  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    runValidators: true,
    new: true,
  });

  if (!updatedUser) return next(new AppError(`User can't be found`), 404);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
