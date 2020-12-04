const multer = require('multer');
const User = require('../models/userModel');
const factory = require('./factory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/Email');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  for (let key in obj) {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img/users');
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];

    callback(
      null,
      `${req.user.name.split(' ')[0].toLowerCase()}-${Date.now()}.${ext}`
    );
  },
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new AppError('Photo only accepts images!', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.textMultipart = upload.none();
exports.uploadUserPhoto = upload.single('photo');

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, { path: 'projects' });
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = newUser.generateUserConfirmationToken();

  await newUser.save({ validateBeforeSave: false });

  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/signup/${token}`;

  await new Email(newUser, url).sendWelcome();

  res.status(201).json({
    status: 'success',
    data: {
      data: newUser,
    },
  });
});

// update User is restricted to admin, needs its own middleware, that allows hooks to run
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('No user with that id!', 404));
  
  console.log(req.body);
  if (!req.body.active) req.body.active = false;
  if (req.file) req.body.photo = req.file.filename;
  for (let key in req.body) {
    user[key] = req.body[key];
  }
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      data: user,
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
  const filteredBody = filterObj(req.body, 'name', 'email', 'organization');
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    runValidators: true,
    new: true,
  });

  if (!updatedUser) return next(new AppError(`User can't be found`), 404);

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedUser,
    },
  });
});
