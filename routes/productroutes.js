const express = require('express');
const Product = require('../models/product'); // Mengimpor model produk
const router = express.Router();

// Endpoint untuk mendapatkan semua produk
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        console.log('Products fetched:', products);  // Tambahkan log untuk melihat data produk
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Server Error');
    }
});

// Endpoint untuk menambahkan produk
router.post('/', async (req, res) => {
    try {
        const { name, image_url, price, description } = req.body;
        console.log('Product data received:', req.body);  // Tambahkan log untuk melihat data yang diterima
        const newProduct = await Product.create({ name, image_url, price, description });
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).send('Server Error');
    }
});

// Endpoint untuk memperbarui produk
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, image_url, price, description } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        product.name = name;
        product.image_url = image_url;
        product.price = price;
        product.description = description;
        await product.save();

        res.json(product);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Server Error');
    }
});

// Endpoint untuk menghapus produk
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        await product.destroy();
        res.status(200).send('Product deleted successfully');
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
