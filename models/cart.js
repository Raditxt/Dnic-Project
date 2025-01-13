// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sesuaikan dengan konfigurasi DB Anda

class Cart {
    constructor(userId, productId, quantity) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.subtotal = 0; // Akan dihitung berdasarkan quantity * price
    }

    // Getter untuk subtotal
    getSubtotal() {
        return this.quantity * this.product.price;
    }

    // Metode untuk menambahkan item ke cart
    static async addItem(userId, productId, quantity) {
        const product = await Product.findById(productId);
        if (product) {
            const newItem = await sequelize.models.Cart.create({
                userId,
                productId,
                quantity,
                subtotal: quantity * product.price
            });
            return newItem;
        }
        throw new Error('Produk tidak ditemukan');
    }

    // Metode untuk menghapus item dari cart
    static async removeItem(cartId) {
        const cartItem = await sequelize.models.Cart.findByPk(cartId);
        if (cartItem) {
            await cartItem.destroy();
        }
    }

    // Metode untuk mendapatkan semua item cart untuk pengguna tertentu
    static async getItemsForUser(userId) {
        return await sequelize.models.Cart.findAll({
            where: { userId }
        });
    }
}

sequelize.define('Cart', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

module.exports = Cart;
