const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Impor koneksi database

dotenv.config(); // Memuat variabel lingkungan dari .env

const app = express();

// Middleware
app.use(express.json()); // Parsing JSON di request body

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World from DNIC Project Backend!');
});

// Gunakan route untuk user
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
