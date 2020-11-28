const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router({caseSensitive: true});

router.get('/', authController.isLoggedIn, viewsController.getHome);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get('/forgotPassword', viewsController.getForgotPasswordForm);
router.get('/resetPassword/:token', viewsController.getResetPasswordForm);

router.get(
  '/projects',
  authController.protect,
  viewsController.getAllProjects
);

router.get('/projects/create', authController.protect, viewsController.getProjectForm)
router.get('/projects/:projectId/update', authController.protect, viewsController.getProjectForm)
router.get('/projects/:projectId/preview', authController.protect, viewsController.getProjectForm)


router.get(
  '/projects/:projectId/issues',
  authController.protect,
  viewsController.getProjectDetails
  );

  router.get('/projects/:projectId/issues/create', authController.protect, viewsController.getIssueForm)
  router.get('/projects/:projectId/issues/:issueId/update', authController.protect, viewsController.getIssueForm)
  router.get('/projects/:projectId/issues/:issueId/preview', authController.protect, viewsController.getIssueForm)

module.exports = router;
