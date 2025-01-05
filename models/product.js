const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Mengimpor koneksi dari database.js

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // ID auto increment
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Nama produk tidak boleh kosong
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false, // URL gambar produk tidak boleh kosong
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // Harga produk tidak boleh kosong
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, // Deskripsi bisa kosong
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true, // Kategori produk (misalnya "Elektronik", "Fashion", dll)
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false, // Jumlah stok produk
        defaultValue: 0,  // Default ke 0 jika stok tidak ditentukan
    },
}, {
    timestamps: true, // Menambahkan createdAt dan updatedAt secara otomatis
});

module.exports = Product;
