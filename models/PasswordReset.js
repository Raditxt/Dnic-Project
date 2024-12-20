// models/PasswordReset.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Impor instance Sequelize

const PasswordReset = sequelize.define('PasswordReset', {
  email: {
    type: DataTypes.STRING,
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
});

module.exports = PasswordReset;
