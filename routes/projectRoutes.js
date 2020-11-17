const express = require('express');
const projectController = require('./../controllers/projectController');
const authController = require('./../controllers/authController');
const issueRouter = require('./issueRoutes');

const router = express.Router();



router.use('/:projectId/issues', issueRouter);

router.use(authController.protect)

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
