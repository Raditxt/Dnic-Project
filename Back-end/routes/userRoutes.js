const express = require('express');
const router = express.Router();

// Contoh rute untuk mengambil data pengguna
router.get('/users', (req, res) => {
  res.json([{ name: 'John Doe' }, { name: 'Jane Doe' }]);
});

module.exports = router;
