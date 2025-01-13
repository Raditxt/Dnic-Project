const bcrypt = require('bcrypt');
const winston = require('winston');
const { User } = require('../models/User');

// BaseController sebagai superclass
class BaseController {
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    });
  }

  handleError(res, error, message = 'Internal server error') {
    this.logger.error(message, { error });
    res.status(500).json({ error: message });
  }
}

// UserController yang mewarisi BaseController
class UserController extends BaseController {
  constructor() {
    super();
    this.resourceName = 'User';
  }

  // CREATE: Menambahkan user baru
  async createUser(req, res) {
    try {
      const { email, phone_number, password } = req.body;

      // Validasi input
      if (!email || !phone_number || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        phone_number,
        password: hashedPassword,
      });

      res.status(201).json({ message: `${this.resourceName} created successfully`, user });
    } catch (error) {
      this.handleError(res, error, `Error creating ${this.resourceName}`);
    }
  }

  // READ: Mengambil semua data user
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      this.handleError(res, error, `Error fetching ${this.resourceName}s`);
    }
  }

  // UPDATE: Mengupdate data user berdasarkan email
  async updateUser(req, res) {
    try {
      const { email, phone_number } = req.body;

      // Validasi input
      if (!email || !phone_number) {
        return res.status(400).json({ error: 'Email and phone number are required' });
      }

      const [updated] = await User.update(
        { phone_number },
        { where: { email } }
      );

      if (updated) {
        const updatedUser = await User.findOne({ where: { email } });
        res.status(200).json({ message: `${this.resourceName} updated successfully`, updatedUser });
      } else {
        res.status(404).json({ error: `${this.resourceName} not found` });
      }
    } catch (error) {
      this.handleError(res, error, `Error updating ${this.resourceName}`);
    }
  }

  // DELETE: Menghapus user berdasarkan email
  async deleteUser(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const deleted = await User.destroy({
        where: { email },
      });

      if (deleted) {
        res.status(200).json({ message: `${this.resourceName} deleted successfully` });
      } else {
        res.status(404).json({ error: `${this.resourceName} not found` });
      }
    } catch (error) {
      this.handleError(res, error, `Error deleting ${this.resourceName}`);
    }
  }
}

module.exports = new UserController();
