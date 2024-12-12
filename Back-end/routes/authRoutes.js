const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Rute untuk registrasi, harusnya POST
router.post('/register', register);

// Rute untuk login, harusnya POST
router.post('/login', login);

module.exports = router;
