const express = require('express');
const issueController = require('./../controllers/issueController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/criterias').get(issueController.getAllAcceptanceCriteria);

router.use(authController.protect)

router
  .route('/')
  .get(issueController.getAllIssues)
  .post(issueController.createIssue);

router
  .route('/:id')
  .get(issueController.getIssue)
  .patch(issueController.updateIssue)
  .delete(issueController.deleteIssue);

module.exports = router;
