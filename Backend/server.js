const sequelize = require('./config/database'); // Import konfigurasi database
const sequelize = require('./utils/database');


// Tes koneksi ke database
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    sequelize.sync({ alter: true }) // alter: untuk menyesuaikan struktur tabel
    .then(() => {
      console.log('Database synchronized!');
    })
    .catch((err) => {
      console.error('Error synchronizing database:', err);
    });