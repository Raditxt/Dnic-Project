const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");
const crypto = require("crypto");
const sendMail = require("../config/mailConfig"); // Mengimpor fungsi pengiriman email
const rateLimit = require("express-rate-limit");
const winston = require("winston");
const { Op } = require('sequelize');


// Konfigurasi Winston untuk logging
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

// Registrasi pengguna baru
exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    password,
    confirm_password,
  } = req.body;

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

    const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/// Lupa password: kirim email reset password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Cari pengguna berdasarkan email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "Email tidak ditemukan" });
      }
  
      // Generate token untuk reset password
      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
  
      // Simpan token dan waktu kedaluwarsa ke database
      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token berlaku 10 menit
      await user.save();
  
      // Buat pesan email
      const emailSubject = "Reset Password DNIC Project";
      const emailText = `
  Anda telah meminta untuk mereset password Anda.
  Berikut adalah token reset password Anda:
  ${resetToken}
  
  Token ini berlaku selama 10 menit. Jika Anda tidak meminta reset password, abaikan email ini.
  `;
  
      // Kirim email
      await sendMail(user.email, emailSubject, emailText);
  
      // Respon sukses
      res
        .status(200)
        .json({ message: "Token reset password telah dikirim ke email Anda" });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  };

// Verifikasi token reset password
exports.verifyToken = async (req, res) => {
    const { token } = req.body;
  
    try {
      // Hash token yang diterima untuk mencocokkannya dengan yang disimpan di database
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
      // Cari pengguna berdasarkan token dan periksa apakah token masih valid
      const user = await User.findOne({
        where: {
          resetPasswordToken: hashedToken,
          resetPasswordExpires: { [Op.gt]: Date.now() }, // Token belum kedaluwarsa
        },
      });
  
      if (!user) {
        return res.status(400).json({
          message: "Token tidak valid atau telah kedaluwarsa.",
        });
      }
  
      res.status(200).json({
        message: "Token valid. Anda dapat mengatur ulang password.",
      });
    } catch (error) {
      console.error("Error in verifyToken:", error);
      res.status(500).json({
        message: "Terjadi kesalahan pada server.",
      });
    }
};
  

// Reset password dengan token ("setpassword")
exports.setPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required" });
  }

  // Validasi password baru agar memenuhi standar keamanan
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain a mix of uppercase, lowercase, numbers, and special characters.",
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
    logger.error(`Error in setPassword: ${error.message}`);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

// Rate Limiting untuk forgotPassword dan setPassword
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimal 5 permintaan per IP dalam 15 menit
  message: "Too many requests, please try again later.",
});

const setPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimal 5 permintaan per IP dalam 15 menit
  message: "Too many requests, please try again later.",
});

// Menambahkan rate limiting pada route
exports.forgotPasswordLimiter = forgotPasswordLimiter;
exports.setPasswordLimiter = setPasswordLimiter;
