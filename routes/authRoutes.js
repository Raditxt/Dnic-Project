const express = require('express');
const router = express.Router();
const { register, login, forgotPassword } = require('../controllers/authController'); // Import fungsi forgotPassword

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword); // Tambahkan route baru untuk forgot password

module.exports = router;
