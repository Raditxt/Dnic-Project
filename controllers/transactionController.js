const { Products, Carts, Transactions } = require('../models');

// Checkout (create transaction)
exports.checkout = async (req, res) => {
  const { user_id, cart_items, payment_id } = req.body;

  // Calculate total amount and validate stock
  let totalAmount = 0;
  for (const item of cart_items) {
    const product = await Products.findByPk(item.product_id);
    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ message: 'Product not available or insufficient stock.' });
    }
    totalAmount += product.price * item.quantity;
  }

  // Update stock and clear cart
  for (const item of cart_items) {
    const product = await Products.findByPk(item.product_id);
    product.stock -= item.quantity;
    await product.save();

    const cartItem = await Carts.findByPk(item.cart_id);
    if (cartItem) await cartItem.destroy();
  }

  // Create transaction
  const transaction = await Transactions.create({
    user_id,
    total_amount: totalAmount,
    status: 'pending',
    payment_id,
  });

  res.status(201).json({ message: 'Transaction created.', transaction });
};

// Get transaction history
exports.getTransactionHistory = async (req, res) => {
  const { user_id } = req.params;

  const transactions = await Transactions.findAll({
    where: { user_id },
    order: [['created_at', 'DESC']],
  });

  res.status(200).json(transactions);
};
