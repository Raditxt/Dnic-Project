// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sesuaikan dengan konfigurasi DB Anda

class Product {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // Getter untuk stock
    getStock() {
        return this.stock;
    }

    // Mengurangi stock setelah checkout
    reduceStock(quantity) {
        if (quantity <= this.stock) {
            this.stock -= quantity;
        } else {
            throw new Error('Stok tidak mencukupi');
        }
    }

    // Metode untuk mendapatkan data produk dari DB
    static async getAll() {
        return await sequelize.models.Product.findAll();
    }

    // Metode untuk menemukan produk berdasarkan ID
    static async findById(id) {
        return await sequelize.models.Product.findByPk(id);
    }
}

sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Product;
