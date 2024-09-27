// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure that product has a name
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Precision and scale for currency
      allowNull: false,
      validate: {
        isDecimal: true, // Ensure the price is a valid decimal number
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10, // Default stock value
      validate: {
        isNumeric: true, // Ensure stock is a numeric value
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category', // References the Category model
        key: 'id',
      },
      allowNull: true, // Can be null if product doesn't have a category
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
