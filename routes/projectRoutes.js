const express = require('express');
const projectController = require('./../controllers/projectController');
const authController = require('./../controllers/authController');
const issueRouter = require('./issueRoutes');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, projectController.getAllProjects)
  .post(authController.protect, projectController.createProject);

router.use('/:projectId/issues', issueRouter);

router
  .route('/:id')
  .get(authController.protect, projectController.getProject)
  .patch(authController.protect, projectController.updateProject)
  .delete(authController.protect, projectController.deleteProject);

module.exports = router;
