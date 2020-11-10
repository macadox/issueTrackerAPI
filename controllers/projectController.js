const Project = require('./../models/projectModel');
const factory = require('./factory');

const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Project.find({
      $or: [{ owner: req.user._id }, { teamMembers: req.user._id }],
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const docs = await features.query;

  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      data: docs,
    },
  });
});
exports.getProject = catchAsync(async (req, res, next) => {
  let query = Project.findById(req.params.id);
  query = query.find({
    $or: [{ owner: req.user._id }, { teamMembers: req.user._id }],
  });
  const doc = await query;
  if (!doc) return next(new AppError('No doc found with that id', 404));
  if (doc.length == 0)
    return next(new AppError(`You don't have access to his project!`, 403));
    
  res.status(200).json({
    status: 'success',
    message: `The doc with id ${req.params.id} is here:`,
    data: {
      data: doc,
    },
  });
});
exports.createProject = catchAsync(async (req, res, next) => {
  // Allow nested route
  if (!req.body.owner) req.body.owner = req.user.id;

  const newDoc = await Project.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newDoc,
    },
  });
});
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);

// exports.showAssignedProjects = catchAsync(async(req, res, next) => {
//   const docs = Project.find({ $or: [{ owner: req.user._id }, { teamMembers: req.user._id }] })
//   next()
// })

//   // this.find({ $or: [{ owner: req.user._id }, { teamMembers: req.user._id }] });
