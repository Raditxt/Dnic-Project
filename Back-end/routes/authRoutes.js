const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    requestResetPassword, 
    verifyResetToken, 
    setNewPassword 
} = require('../controllers/authController');

// Rute untuk registrasi
router.post('/register', register);

// Rute untuk login
router.post('/login', login);

// Rute untuk mengirimkan permintaan reset password
router.post('/forgot-password', requestResetPassword);

// Rute untuk memverifikasi token reset password
router.post('/verify-token', verifyResetToken);

// Rute untuk mengatur password baru
router.post('/reset-password', setNewPassword);

module.exports = router;
