const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// Middleware untuk parsing JSON
app.use(express.json());

// Route untuk autentikasi
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
