const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

// POST: Tambah user
router.post('/', createUser);

// GET: Ambil semua user
router.get('/', getAllUsers);

module.exports = router;
