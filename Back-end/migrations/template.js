module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define('Template', {
      title: DataTypes.STRING,
      category: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
  });
  return Template;
};
