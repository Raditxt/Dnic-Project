// migrations/xxxx-create-cart.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nama tabel Users
          key: 'id', // Mengacu pada kolom 'id' di tabel Users
        },
        onDelete: 'CASCADE', // Jika user dihapus, item di keranjang juga dihapus
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', // Nama tabel Products
          key: 'id', // Mengacu pada kolom 'id' di tabel Products
        },
        onDelete: 'CASCADE', // Jika produk dihapus, item di keranjang juga dihapus
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1, // Menjamin bahwa jumlah barang minimal 1
        },
      },
      subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'), // Set default timestamp
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'), // Set default timestamp
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Jika migrasi di-rollback, tabel 'Carts' akan dihapus
    await queryInterface.dropTable('Carts');
  },
};
