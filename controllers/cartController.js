// controllers/cartController.js
const Cart = require('../models/cart');
const Product = require('../models/Product');

class CartController {
    // Menambahkan produk ke cart
    static async addToCart(req, res) {
        const { userId, productId, quantity } = req.body;
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Produk tidak ditemukan' });
            }

            if (product.stock < quantity) {
                return res.status(400).json({ message: 'Stok tidak cukup' });
            }

            const newCartItem = await Cart.addItem(userId, productId, quantity);
            res.status(201).json({ message: 'Produk berhasil ditambahkan ke keranjang', cartItem: newCartItem });
        } catch (error) {
            res.status(500).json({ message: 'Gagal menambahkan produk ke keranjang', error: error.message });
        }
    }

    // Menampilkan produk dalam keranjang pengguna
    static async getCart(req, res) {
        const { userId } = req.query;
        try {
            const cartItems = await Cart.getItemsForUser(userId);
            res.status(200).json(cartItems);
        } catch (error) {
            res.status(500).json({ message: 'Gagal memuat keranjang', error: error.message });
        }
    }
}

module.exports = CartController;
