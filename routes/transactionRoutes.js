const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/checkout', transactionController.checkout);
router.get('/history/:user_id', transactionController.getTransactionHistory);

module.exports = router;
