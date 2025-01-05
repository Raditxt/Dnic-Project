const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Mengimpor koneksi database
const authRoutes = require('./routes/authRoutes'); // Mengimpor routes untuk autentikasi
const productRoutes = require('./routes/productroutes'); // Mengimpor routes untuk produk
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Menggunakan dotenv untuk variabel lingkungan

const app = express();

// Middleware untuk CORS
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // URL Live Server
  methods: 'GET,POST,PUT,DELETE', // Metode yang diizinkan
};
app.use(cors(corsOptions)); // Mengaktifkan CORS dengan opsi khusus

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes); // Menambahkan route untuk autentikasi
app.use('/api/products', productRoutes); // Menambahkan route untuk produk

// Menyajikan file statis dari folder 'public/images'
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Sinkronisasi dengan database (gunakan force: true hanya untuk pengembangan)
sequelize.sync({ force: false }) // Jangan gunakan force: true di produksi
  .then(() => {
    console.log('Database connected and tables created');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

// Menjalankan server
const PORT = process.env.PORT || 5000; // Gunakan port dari .env jika ada, atau 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
