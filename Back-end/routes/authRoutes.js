const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route untuk Sign Up
router.post('/signup', authController.signup);

// Route untuk Login
router.post('/login', authController.login);

module.exports = router;
