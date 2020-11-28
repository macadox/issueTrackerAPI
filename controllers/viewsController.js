const Project = require('./../models/projectModel');
const Issue = require('./../models/issueModel');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getHome = (req, res) => {
  res.status(200).render('home', {
    title: 'Home',
    active: 'Home',
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
    active: 'Login',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Signup',
    active: 'Sign up',
  });
};

exports.getForgotPasswordForm = (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot password?',
    active: 'Login',
  });
};

exports.getResetPasswordForm = (req, res) => {
  res.status(200).render('resetPassword', {
    title: 'Reset your password',
    token: req.params.token,
    active: 'Login',
  });
};

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find().sort('_id');
  if (!req.query.grid) req.query.grid = false;
  else req.query.grid = true;

  if (req.query.grid) {
    res.status(200).render('gridProjects', {
      title: 'My projects',
      projects,
      active: 'Projects',
    });
  } else {
    res.status(200).render('listProjects', {
      title: 'My projects',
      projects,
      active: 'Projects',
    });
  }
});

exports.getProjectDetails = catchAsync(async (req, res, next) => {
  const issues = await Issue.find({ project: req.params.projectId }).sort(
    '_id'
  );
  if (!req.query.grid) req.query.grid = false;
  else req.query.grid = true;

  if (req.query.grid) {
    res.status(200).render('gridIssues', {
      title: 'Project name',
      issues,
      projectId: req.params.projectId,
      active: 'Projects',
    });
  } else {
    res.status(200).render('listIssues', {
      title: 'Project name',
      issues,
      projectId: req.params.projectId,
      active: 'Projects',
    });
  }
});

exports.getProjectForm = catchAsync(async (req, res, next) => {
  let project;
  const parts = req.path.split('/');
  const mode = parts[parts.length - 1];
  const users = await User.find();

  if (mode !== 'create') {
    project = await Project.findById(req.params.projectId);
    if (!project)
      return next(new AppError('There is no project with such id!', 404));
  }

  res.status(200).render('projectForm', {
    title:
      mode == 'create'
        ? 'Create a new project'
        : mode == 'update'
        ? `Update project ${project.prefix}`
        : `Preview project ${project.prefix}`,
    formMode: mode,
    users,
    project,
    active: 'Projects',
  });
});

exports.getIssueForm = catchAsync(async (req, res, next) => {
  let issue, project;
  const parts = req.path.split('/');
  const mode = parts[parts.length - 1];
  const users = await User.find();

  
  if (mode !== 'create') {
    project = await Project.findById(req.params.projectId);
    if (!project)
    return next(new AppError('There is no project with such id!', 404));
    
    issue = await Issue.findById(req.params.issueId);
    if (!issue)
    return next(new AppError('There is no issue with such id!', 404));
    
    if (issue.project != req.params.projectId)
    return next(
      new AppError('This issue does not belong to that project!'),
      404
      );
    }
    console.log(issue.acceptanceCriterias)

  res.status(200).render('issueForm', {
    title:
      mode == 'create'
        ? 'Submit a new issue'
        : mode == 'update'
        ? `Update issue ${issue.issueId}`
        : `Preview issue ${issue.issueId}`,
    formMode: mode,
    projectId: req.params.projectId,
    users,
    issue,
    active: 'Projects',
  });
});
