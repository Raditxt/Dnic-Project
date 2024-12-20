const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const crypto = require('crypto');
const sendMail = require('../config/mailConfig'); // Mengimpor fungsi pengiriman email
const rateLimit = require('express-rate-limit');
const winston = require('winston');

// Konfigurasi Winston untuk logging
const logger = winston.createLogger({
  level: 'info',
  transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Registrasi pengguna baru
exports.register = async (req, res) => {
    const { first_name, last_name, email, phone_number, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const existingPhone = await User.findOne({ where: { phone_number } });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone number already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            first_name,
            last_name,
            email,
            phone_number,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login pengguna
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Lupa password: kirim email reset password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // Berlaku 15 menit

        // Simpan token ke database
        await PasswordReset.create({
            email,
            token: resetToken,
            expiresAt,
        });

        // Buat URL reset
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`;
        const message = `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link will expire in 15 minutes.`;

        // Kirim email
        await sendMail(email, 'Password Reset Request', message);

        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        console.error("Error occurred in forgotPassword:", error.message);
        logger.error(`Error in forgotPassword: ${error.message}`);
        if (!res.headersSent) {
            res.status(500).json({ message: "An error occurred. Please try again." });
        }
    }
};
// Lupa password: kirim email reset password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
      return res.status(400).json({ message: "Email is required" });
  }

  try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // Berlaku 15 menit

      // Simpan token ke database
      await PasswordReset.create({
          email,
          token: resetToken,
          expiresAt,
      });

      // Buat URL reset untuk halaman verifikasi token
      const verifyUrl = `${req.protocol}://${req.get('host')}/verify-token?token=${resetToken}`;
      const message = `Click the link below to verify your token and reset your password:\n\n${verifyUrl}\n\nThis link will expire in 15 minutes.`;

      // Kirim email
      await sendMail(email, 'Password Reset Request', message);

      res.status(200).json({ message: "Password reset email sent, please verify your token" });
  } catch (error) {
      console.error("Error occurred in forgotPassword:", error.message);
      logger.error(`Error in forgotPassword: ${error.message}`);
      if (!res.headersSent) {
          res.status(500).json({ message: "An error occurred. Please try again." });
      }
  }
};

// Verifikasi token (untuk halaman verify-token)
exports.verifyToken = async (req, res) => {
  const { token } = req.query;

  if (!token) {
      return res.status(400).json({ message: "Token is required" });
  }

  try {
      const resetEntry = await PasswordReset.findOne({ where: { token } });

      if (!resetEntry) {
          return res.status(400).json({ message: "Invalid or expired token" });
      }

      if (resetEntry.expiresAt < new Date()) {
          return res.status(400).json({ message: "Token has expired" });
      }

      res.status(200).json({ message: "Token is valid, proceed to reset your password", token });
  } catch (error) {
      console.error(error);
      logger.error(`Error in verifyToken: ${error.message}`);
      res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

// Reset password dengan token
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
  }

  // Validasi password baru agar memenuhi standar keamanan
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
          message: "Password must be at least 8 characters long and contain a mix of uppercase, lowercase, numbers, and special characters."
      });
  }

  try {
      const resetEntry = await PasswordReset.findOne({ where: { token } });

      if (!resetEntry) {
          return res.status(400).json({ message: "Invalid or expired token" });
      }

      if (resetEntry.expiresAt < new Date()) {
          return res.status(400).json({ message: "Token has expired" });
      }

      const user = await User.findOne({ where: { email: resetEntry.email } });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Hash password baru
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });

      // Hapus token setelah digunakan
      await PasswordReset.destroy({ where: { token } });

      res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
      console.error(error);
      logger.error(`Error in resetPassword: ${error.message}`);
      res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

// Rate Limiting untuk forgotPassword dan resetPassword
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimal 5 permintaan per IP dalam 15 menit
  message: 'Too many requests, please try again later.',
});

const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimal 5 permintaan per IP dalam 15 menit
  message: 'Too many requests, please try again later.',
});

// Menambahkan rate limiting pada route
exports.forgotPasswordLimiter = forgotPasswordLimiter;
exports.resetPasswordLimiter = resetPasswordLimiter;