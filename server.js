const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');
const cartRoutes = require('./routes/cartRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
require('dotenv').config();

const app = express();

// Middleware untuk CORS
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: 'GET,POST,PUT,DELETE',
};
app.use(cors(corsOptions)); // Mengaktifkan CORS dengan opsi khusus

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes); // Menambahkan route untuk autentikasi
app.use('/api/products', productRoutes); // Menambahkan route untuk produk
app.use('/api/cart', cartRoutes);
app.use('/api/transaction', transactionRoutes);

// Menyajikan file statis dari folder 'public/images'
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


// Sinkronisasi dengan database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected and tables created');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
