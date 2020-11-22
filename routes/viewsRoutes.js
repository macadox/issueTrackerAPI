const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/',authController.isLoggedIn, viewsController.getHome);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get('/forgotPassword', viewsController.getForgotPasswordForm);
router.get('/resetPassword/:token', viewsController.getResetPasswordForm)

router.get('/myprojects', viewsController.getAllProjects)

module.exports = router;
