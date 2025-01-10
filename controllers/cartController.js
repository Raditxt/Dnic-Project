const { Carts} = require('../models');
const { Products } = require ('../models')
// Add product to cart
exports.addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  // Validate product existence and stock
  const product = await Products.findByPk(product_id);
  if (!product || product.stock < quantity) {
    return res.status(400).json({ message: 'Product not available or insufficient stock.' });
  }

  // Check if product already in cart
  const cartItem = await Carts.findOne({ where: { user_id, product_id } });

  if (cartItem) {
    cartItem.quantity += quantity;
    cartItem.subtotal = cartItem.quantity * product.price;
    await cartItem.save();
  } else {
    await Carts.create({
      user_id,
      product_id,
      quantity,
      subtotal: quantity * product.price,
    });
  }

  res.status(200).json({ message: 'Product added to cart.' });
};

// Get cart items
exports.getCart = async (req, res) => {
  const { user_id } = req.query;

  const cartItems = await Carts.findAll({
    where: { user_id },
    include: [{ model: Products, attributes: ['name', 'price', 'image_url'] }],
  });

  const formattedCart = cartItems.map(item => ({
    cart_id: item.id,
    product_name: item.Product.name,
    price: item.Product.price,
    quantity: item.quantity,
    subtotal: item.subtotal,
  }));

  res.status(200).json(formattedCart);
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { cart_id } = req.params;

  const cartItem = await Carts.findByPk(cart_id);
  if (!cartItem) {
    return res.status(404).json({ message: 'Cart item not found.' });
  }

  await cartItem.destroy();
  res.status(200).json({ message: 'Product removed from cart.' });
};
