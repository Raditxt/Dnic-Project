const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sesuaikan dengan lokasi file database Anda

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,  // Validasi email
        },
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[0-9]+$/, // Hanya menerima angka
          len: [10, 15],   // Panjang nomor telepon antara 10 dan 15 digit
        },
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
}, {
    tableName: 'users', // Nama tabel di database
});

module.exports = User;
