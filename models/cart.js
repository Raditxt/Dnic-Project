// models/cart.js
module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      // ID Cart (Primary Key)
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // ID User (Foreign Key, mengaitkan dengan pengguna)
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Tabel Users
          key: 'id',
        },
      },
      // ID Produk (Foreign Key, mengaitkan dengan produk)
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', // Tabel Products
          key: 'id',
        },
      },
      // Jumlah produk yang ditambahkan ke keranjang
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
      // Subtotal untuk produk di keranjang (harga * kuantitas)
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  
    // Relasi: Cart berhubungan dengan User dan Product
    Cart.associate = (models) => {
      Cart.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      Cart.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      });
    };
  
    return Cart;
  };
  