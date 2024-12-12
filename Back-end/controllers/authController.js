const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Fungsi untuk registrasi
const register = async (req, res) => {
    const { email, phone_number, password } = req.body;

    try {
        // Periksa apakah email sudah ada
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Periksa apakah nomor telepon sudah ada
        const phoneExists = await User.findOne({ where: { phone_number } });
        if (phoneExists) {
            return res.status(400).json({ message: 'Phone number already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user baru
        const user = await User.create({
            email,
            phone_number,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, email: user.email, phone_number: user.phone_number },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login };
