const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController'); // Mengimpor kelas AuthController

// Endpoint untuk registrasi pengguna baru
router.post('/register', AuthController.register);

// Endpoint untuk login pengguna
router.post('/login', AuthController.login);

// Endpoint untuk mengirimkan link reset password
router.post('/forgot-password', AuthController.forgotPasswordLimiter(), AuthController.forgotPassword);

// Endpoint untuk memverifikasi token reset password
router.post('/verify-token', AuthController.verifyToken);

// Endpoint untuk mengganti password dengan password baru
router.post('/set-password', AuthController.setNewPassword);

module.exports = router;
