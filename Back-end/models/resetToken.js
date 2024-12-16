const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ResetToken extends Model {
    static associate(models) {
      // Relasi dengan tabel User
      ResetToken.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  ResetToken.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ResetToken',
    }
  );
  return ResetToken;
};
