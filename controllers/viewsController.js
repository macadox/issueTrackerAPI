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
  res.status(200).render('auth/login', {
    title: 'Login',
    active: 'Login',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('auth/signup', {
    title: 'Signup',
    active: 'Sign up',
  });
};

exports.getForgotPasswordForm = (req, res) => {
  res.status(200).render('auth/forgotPassword', {
    title: 'Forgot password?',
    active: 'Login',
  });
};

exports.getResetPasswordForm = (req, res) => {
  res.status(200).render('auth/resetPassword', {
    title: 'Reset your password',
    token: req.params.token,
    active: 'Login',
  });
};

exports.getMe = (req, res) => {
  res.status(200).render('account/user', {
    title: 'Account',
    active: 'User'
  })
}

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find().sort('_id');
  if (!req.query.grid) req.query.grid = false;
  else req.query.grid = true;

  if (req.query.grid) {
    res.status(200).render('projects/projectsGrid', {
      title: 'My projects',
      projects,
      active: 'Projects',
    });
  } else {
    res.status(200).render('projects/projectsList', {
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
    res.status(200).render('issues/issuesGrid', {
      title: 'Issue list',
      issues,
      projectId: req.params.projectId,
      active: 'Projects',
    });
  } else {
    res.status(200).render('issues/issuesList', {
      title: 'Issue list',
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

  res.status(200).render('projects/projectForm', {
    title:
      mode == 'create'
        ? 'New project'
        : `${project.name}`,
    formMode: mode,
    users,
    project,
    active: 'Projects',
    statusOptions: Project.schema.path('status').enumValues,
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

  res.status(200).render('issues/issueForm', {
    title:
      mode == 'create'
        ? 'New issue'
        : `${issue.name}`,
    formMode: mode,
    projectId: req.params.projectId,
    users,
    issue,
    active: 'Projects',
    statusOptions: Issue.schema.path('status').enumValues,
    priorityOptions: Issue.schema.path('priority').enumValues
  });
});

// Restricted

exports.getAdminPanel = catchAsync( async(req, res, next) => {
  const users = await User.find().select('+createdOn');

  res.status(200).render('admin/admin', {
    title: 'Admin panel',
    users,
    active: 'Admin'
  })
})

exports.getUserForm = catchAsync(async (req, res, next) => {
  let user;
  const parts = req.path.split('/');
  const mode = parts[parts.length - 1];

  if (mode !== 'create') {
    user = await User.findById(req.params.userId);
    if (!user)
      return next(new AppError('There is no user with such id!', 404));
  }

  res.status(200).render('admin/forms/userForm.pug', {
    title:
      mode == 'create'
        ? 'New User'
        : `${user.name}`,
    formMode: mode,
    active: 'Admin',
    editedUser: user,
    rolesOptions: User.schema.path('roles.0').enumValues,
  });
});