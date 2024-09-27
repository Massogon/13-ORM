// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belong to Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Foreign key in Product table to reference Category
  onDelete: 'CASCADE', // If a category is deleted, all associated products are deleted
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Foreign key in Product table to reference Category
  onDelete: 'CASCADE', // If a category is deleted, all associated products are deleted
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag, // Join table
  foreignKey: 'product_id', // Foreign key in ProductTag table to reference Product
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, // Join table
  foreignKey: 'tag_id', // Foreign key in ProductTag table to reference Tag
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
