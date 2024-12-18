const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

// Middleware
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // URL Live Server
  methods: 'GET,POST,PUT,DELETE', // Metode yang diizinkan
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Database Sync
sequelize.sync().then(() => {
  console.log('Database connected and tables created');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
