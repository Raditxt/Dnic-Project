const sequelize = require('./config/database'); // Import konfigurasi database

// Tes koneksi ke database
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
