// controllers/catalogController.js
const Product = require('../models/Product');
const { authenticateUser } = require('../middleware/authenticateToken'); // Middleware untuk autentikasi

class CatalogController {
    // Menampilkan produk di catalog
    static async viewCatalog(req, res) {
        try {
            // Validasi apakah pengguna sudah login
            const user = authenticateUser(req.headers.authorization);
            if (!user) {
                return res.status(401).json({ message: 'Silakan login terlebih dahulu' });
            }
            const products = await Product.getAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Gagal memuat katalog produk', error: error.message });
        }
    }
}

module.exports = CatalogController;
