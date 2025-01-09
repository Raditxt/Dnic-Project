const { User } = require('../models/User'); // Sesuaikan dengan path model Anda

class UserController {
  // CREATE: Menambahkan user baru
  async createUser(req, res) {
    try {
      const user = await User.create({
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password, // Pastikan untuk mengenkripsi password jika perlu
      });
      res.status(201).json(user);
    } catch (error) {
      console.error('Error saat menambahkan user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // READ: Mengambil semua data user
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error saat mengambil data users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // UPDATE: Mengupdate data user berdasarkan email
  async updateUser(req, res) {
    try {
      const { email, phone_number } = req.body;
      const [updated] = await User.update(
        { phone_number: phone_number },
        { where: { email: email } }
      );
      if (updated) {
        const updatedUser = await User.findOne({ where: { email: email } });
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error saat mengupdate user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // DELETE: Menghapus user berdasarkan email
  async deleteUser(req, res) {
    try {
      const { email } = req.body;
      const deleted = await User.destroy({
        where: { email: email },
      });
      if (deleted) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error saat menghapus user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
