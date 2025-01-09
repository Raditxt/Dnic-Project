module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define(
    'Transactions',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nama tabel relasi
          key: 'id',
        },
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2), // Format angka desimal
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // Status default
      },
      payment_id: {
        type: DataTypes.STRING,
        allowNull: true, // ID dari payment gateway seperti Midtrans
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('NOW()'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('NOW()'),
      },
    },
    {
      tableName: 'Transactions',
      timestamps: true, // Untuk createdAt dan updatedAt
      underscored: true, // Gaya penamaan snake_case
    }
  );

  Transactions.associate = (models) => {
    Transactions.belongsTo(models.Users, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };

  return Transactions;
};
