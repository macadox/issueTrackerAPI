const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', userController.textMultipart, authController.signup);
router.get('/signup/:token', authController.confirmSignup);
router.post('/login', userController.textMultipart, authController.login);
router.get('/logout', authController.logout);
router.post(
  '/forgotPassword',
  userController.textMultipart,
  authController.forgotPassword
);
router.patch(
  '/resetPassword/:token',
  userController.textMultipart,
  authController.resetPassword
);

router.use(authController.protect);

router
  .route('/updateDetails')
  .patch(userController.uploadUserPhoto, userController.updateDetails);
router
  .route('/updatePassword')
  .patch(userController.textMultipart, authController.updatePassword);

// user must be able to fetch all users to assign them to forms.
router
.route('/')
.get(userController.getAllUsers)
.post(authController.restrict('admin'), userController.createUser);

router.use(authController.restrict('admin'));

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.uploadUserPhoto, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
