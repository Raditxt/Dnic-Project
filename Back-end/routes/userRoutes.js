const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken');
const User = require('../models/User');

// Middleware untuk autentikasi token
router.use(authenticateToken);

// Mengambil daftar pengguna
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
});

// Mengambil data pengguna berdasarkan ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err });
    }
});

module.exports = router;
