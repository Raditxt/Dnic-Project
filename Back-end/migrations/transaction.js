Transaction.associate = (models) => {
  Transaction.belongsToMany(models.Template, {
      through: 'TransactionTemplate',
      foreignKey: 'transactionId',
  });
};
