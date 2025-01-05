'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'category', {
      type: Sequelize.STRING,
      allowNull: true, // Kategori produk
    });
    
    await queryInterface.addColumn('Products', 'stock', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Default ke 0 jika stok tidak ditentukan
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'category');
    await queryInterface.removeColumn('Products', 'stock');
  }
};
