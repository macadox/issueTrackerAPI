const Project = require('./../models/projectModel');
const factory = require('./factory');

const catchAsync = require('./../utils/catchAsync');

exports.getAllProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project);
exports.createProject = catchAsync(async (req, res, next) => {
  // Allow nested route
  if (!req.body.teamLead) req.body.teamLead = req.user.id;

  const newDoc = await Project.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Document created',
    data: {
      data: newDoc,
    },
  });
});
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
