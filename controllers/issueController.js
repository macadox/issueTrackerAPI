const Issue = require('../models/issueModel');
const factory = require('./factory');

const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllIssues = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.projectId) filter = { project: req.params.projectId };

  const features = new APIFeatures(Issue.find(filter), req.query)
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
exports.getIssue = factory.getOne(Issue);
exports.createIssue = catchAsync(async (req, res, next) => {
  // Allow nested route
  if (!req.body.author) req.body.author = req.user._id;
  if (!req.body.project) req.body.project = req.params.projectId;

  const newDoc = await Issue.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newDoc,
    },
  });
});
exports.updateIssue = factory.updateOne(Issue);
exports.deleteIssue = factory.deleteOne(Issue);

exports.getAllAcceptanceCriteria = catchAsync(async (req, res, next) => {
  const stats = await Issue.aggregate([
    {
      $unwind: '$acceptanceCriterias',
    },
  ]);
  res.status(200).json({
    status: 'success',
    results: stats.length,
    data: {
      data: stats,
    },
  });
});
