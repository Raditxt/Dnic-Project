const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk parsing request body
app.use(express.json());

// Routing
app.use('/auth', authRoutes);

// Start server dan sync database
sequelize.sync()
  .then(() => {
    console.log("Database connected...");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log('Error syncing database:', err));
