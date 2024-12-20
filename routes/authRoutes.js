const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController'); // Import fungsi resetPassword

// Endpoint untuk registrasi pengguna baru
router.post('/register', register);

// Endpoint untuk login pengguna
router.post('/login', login);

// Endpoint untuk permintaan lupa password
router.post('/forgot-password', forgotPassword);

// Endpoint untuk reset password
router.post('/reset-password', resetPassword); // Route untuk proses reset password

module.exports = router;
