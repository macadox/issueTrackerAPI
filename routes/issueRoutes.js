const express = require('express');
const issueController = require('./../controllers/issueController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/criterias').get(issueController.getAllAcceptanceCriteria);

router
  .route('/')
  .get(authController.protect, issueController.getAllIssues)
  .post(authController.protect, issueController.createIssue);

router
  .route('/:id')
  .get(authController.protect, issueController.getIssue)
  .patch(authController.protect, issueController.updateIssue)
  .delete(authController.protect, issueController.deleteIssue);

module.exports = router;
