const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, verifyToken,  forgotPasswordLimiter, setNewPassword } = require('../controllers/authController'); // Import fungsi resetPassword

// Endpoint untuk registrasi pengguna baru
router.post('/register', register);

// Endpoint untuk login pengguna
router.post('/login', login);

router.post('/forgot-password', forgotPasswordLimiter, forgotPassword);

router.post('/verify-token', verifyToken);

router.post('/set-password', setNewPassword);



module.exports = router;