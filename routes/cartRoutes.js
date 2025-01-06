const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

// Tambahkan produk ke keranjang
router.post('/add', cartController.addToCart);

// Ambil semua produk di keranjang untuk user tertentu
router.get('/:user_id', cartController.getCart);

// Hapus produk dari keranjang berdasarkan ID item
router.delete('/:id', cartController.removeFromCart);

// Perbarui jumlah produk di keranjang berdasarkan ID item
router.put('/:id', cartController.updateCartQuantity);

// Hapus semua item dari keranjang untuk user tertentu
router.delete('/clear/:user_id', cartController.clearCart);

// Ambil total harga dari keranjang untuk user tertentu
router.get('/total/:user_id', cartController.getCartTotal);

module.exports = router;
