const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const ResetToken = require('../models/resetToken');

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

// Fungsi untuk mengirim reset password token
const requestResetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 menit

        // Simpan token ke database
        await ResetToken.create({
            userId: user.id,
            token,
            expiresAt,
        });

        // Dummy log untuk menampilkan token (Implementasi email akan berbeda)
        console.log(`Token for ${email}: ${token}`);

        res.status(200).json({
            message: 'Reset password token sent to email',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk verifikasi reset password token
const verifyResetToken = async (req, res) => {
    const { token } = req.body;

    try {
        const resetToken = await ResetToken.findOne({
            where: { token },
            include: [{ model: User, attributes: ['id', 'email'] }],
        });

        if (!resetToken || resetToken.expiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        res.status(200).json({
            message: 'Token is valid',
            userId: resetToken.userId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk set password baru
const setNewPassword = async (req, res) => {
    const { userId, token, newPassword } = req.body;

    try {
        const resetToken = await ResetToken.findOne({ where: { token, userId } });
        if (!resetToken || resetToken.expiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await User.update({ password: hashedPassword }, { where: { id: userId } });

        // Delete token after use
        await ResetToken.destroy({ where: { id: resetToken.id } });

        res.status(200).json({ message: 'Password successfully updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    register,
    login,
    requestResetPassword,
    verifyResetToken,
    setNewPassword,
};
