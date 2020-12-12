const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router({ caseSensitive: true });

router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', authController.isLoggedIn, viewsController.getHome);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get('/forgotPassword', viewsController.getForgotPasswordForm);
router.get('/resetPassword/:token', viewsController.getResetPasswordForm);

// Protect from not logged in users
router.use(authController.protect);

router.get('/me', viewsController.getMe);

router.get('/projects', viewsController.getAllProjects);
router.get('/projects/create', viewsController.getProjectForm);
router.get('/projects/:projectId/update', viewsController.getProjectForm);
router.get('/projects/:projectId/preview', viewsController.getProjectForm);

router.get('/projects/:projectId/issues', viewsController.getProjectDetails);

router.get('/projects/:projectId/issues/create', viewsController.getIssueForm);
router.get(
  '/projects/:projectId/issues/:issueId/update',
  viewsController.getIssueForm
);
router.get(
  '/projects/:projectId/issues/:issueId/preview',
  viewsController.getIssueForm
);

// Restrict permissions to administrators
router.use(authController.restrict('admin'));

router.get('/admin', viewsController.getAdminPanel);
router.get('/admin/users', viewsController.getAdminPanel);
router.get('/admin/users/create', viewsController.getUserForm);
router.get('/admin/users/:userId/preview', viewsController.getUserForm);
router.get('/admin/users/:userId/update', viewsController.getUserForm);

module.exports = router;
