const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");
const rateLimit = require("express-rate-limit");
const winston = require("winston");
const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");
const sendMail = require("../config/mailConfig"); // Fungsi pengiriman email

class AuthController {
  // Konfigurasi Winston untuk logging
  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error" }),
      ],
    });
  }

  // Registrasi pengguna baru
  async register(req, res) {
    const { first_name, last_name, email, phone_number, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      const [existingEmail, existingPhone] = await Promise.all([
        User.findOne({ where: { email } }),
        User.findOne({ where: { phone_number } }),
      ]);

      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }

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
      this.logger.error(`Error in register: ${err.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Login pengguna
  async login(req, res) {
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

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      this.logger.error(`Error in login: ${err.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Lupa password: kirim email reset password
  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

      await PasswordReset.create({
        email,
        token: hashedToken,
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      });

      const emailSubject = "Reset Password DNIC Project";
      const emailText = `Reset password token: ${resetToken}. Berlaku 10 menit.`;

      await sendMail(email, emailSubject, emailText);

      res.status(200).json({ message: "Password reset token sent to email" });
    } catch (error) {
      this.logger.error(`Error in forgotPassword: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Verifikasi token reset password
  async verifyToken(req, res) {
    const { token } = req.body;

    try {
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

      const resetEntry = await PasswordReset.findOne({
        where: {
          token: hashedToken,
          expiresAt: { [Op.gt]: Date.now() },
        },
      });

      if (!resetEntry) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      res.status(200).json({ message: "Token is valid" });
    } catch (error) {
      this.logger.error(`Error in verifyToken: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Ganti password dengan password baru
  async setNewPassword(req, res) {
    const { token, newPassword, confirmPassword } = req.body;

    try {
      if (!token || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "Token and passwords are required" });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

      const resetEntry = await PasswordReset.findOne({
        where: {
          token: hashedToken,
          expiresAt: { [Op.gt]: Date.now() },
        },
      });

      if (!resetEntry) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      const email = resetEntry.email;
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.update({ password: hashedPassword }, { where: { email } });
      await PasswordReset.destroy({ where: { token: hashedToken } });

      res.status(200).json({ message: "Password successfully updated" });
    } catch (error) {
      this.logger.error(`Error in setNewPassword: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Rate Limiting untuk lupa password
  forgotPasswordLimiter() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // Maximum 5 requests per window
      message: "Too many requests, please try again later.",
    });
  }
}

module.exports = new AuthController();
