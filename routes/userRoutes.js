const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController'); // Mengimpor UserController
const { authenticateToken } = require('../middleware/authenticateToken');

// Middleware untuk autentikasi token
router.use(authenticateToken);

// Mengambil daftar pengguna
router.get('/', UserController.getUsers);

// Mengambil data pengguna berdasarkan ID
router.get('/:id', UserController.getUserById);

module.exports = router;
