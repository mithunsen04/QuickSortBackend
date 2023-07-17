


const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Signup route
router.post('/signup', UserController.signup);

// Login route
router.post('/login', UserController.login);


// Forgot password route
router.post('/forgot-password', UserController.forgotPassword);

// Reset password route
router.post('/reset-password', UserController.resetPassword);



module.exports = router;
