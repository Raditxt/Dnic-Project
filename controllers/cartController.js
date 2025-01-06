const { Cart, Product } = require('../models');

// Tambahkan produk ke keranjang
const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // Validasi input
    if (!user_id || !product_id || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Cari produk di database
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Cek apakah produk sudah ada di keranjang
    const existingCartItem = await Cart.findOne({
      where: { user_id, product_id },
    });

    if (existingCartItem) {
      // Update jumlah dan subtotal jika produk sudah ada
      existingCartItem.quantity += quantity;
      existingCartItem.subtotal = existingCartItem.quantity * product.price;
      await existingCartItem.save();
    } else {
      // Tambahkan produk baru ke keranjang
      const subtotal = quantity * product.price;
      await Cart.create({ user_id, product_id, quantity, subtotal });
    }

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

// Ambil semua item di keranjang untuk user tertentu
const getCart = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'image_url', 'price', 'stock'],
        },
      ],
    });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

// Hapus produk dari keranjang
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error: error.message });
  }
};

// Perbarui jumlah produk di keranjang
const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const product = await Product.findByPk(cartItem.product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    cartItem.quantity = quantity;
    cartItem.subtotal = quantity * product.price;
    await cartItem.save();

    res.status(200).json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
};

// Hapus semua item dari keranjang untuk user tertentu
const clearCart = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    await Cart.destroy({ where: { user_id } });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};

// Ambil total harga dari keranjang untuk user tertentu
const getCartTotal = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [{ model: Product, as: 'product', attributes: ['price'] }],
    });

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart total', error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  getCartTotal,
};
