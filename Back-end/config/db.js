const { Sequelize } = require('sequelize');
require('dotenv').config(); // Memuat variabel dari .env

// Inisialisasi koneksi database
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nama database
    process.env.DB_USER, // Username database
    process.env.DB_PASSWORD, // Password database
    {
        host: process.env.DB_HOST, // Host database
        port: process.env.DB_PORT, // Port database
        dialect: 'postgres', // Gunakan PostgreSQL
        logging: false, // Nonaktifkan log SQL untuk kenyamanan
    }
);

// Fungsi untuk memeriksa koneksi
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
