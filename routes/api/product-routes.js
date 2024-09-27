const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Helper function for centralized error handling
const handleError = (res, err, statusCode = 500) => {
  console.error(err);
  res.status(statusCode).json({ error: err.message || 'Something went wrong' });
};

// Helper function to associate product tags
const manageProductTags = async (productId, tagIds) => {
  if (!tagIds || !tagIds.length) return;

  // Fetch existing product tags
  const productTags = await ProductTag.findAll({ where: { product_id: productId } });
  const productTagIds = productTags.map(({ tag_id }) => tag_id);

  // Determine which tags to add
  const newProductTags = tagIds
    .filter((tag_id) => !productTagIds.includes(tag_id))
    .map((tag_id) => ({ product_id: productId, tag_id }));

  // Determine which tags to remove
  const productTagsToRemove = productTags
    .filter(({ tag_id }) => !tagIds.includes(tag_id))
    .map(({ id }) => id);

  // Run both actions in parallel
  await Promise.all([
    ProductTag.destroy({ where: { id: productTagsToRemove } }),
    ProductTag.bulkCreate(newProductTags),
  ]);
};

// The `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.json(products);
  } catch (err) {
    handleError(res, err);
  }
});

// Get one product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    handleError(res, err);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // Handle product-tag associations if tags exist
    await manageProductTags(product.id, req.body.tagIds);

    res.status(201).json(product);
  } catch (err) {
    handleError(res, err, 400);
  }
});

// Update product by ID
router.put('/:id', async (req, res) => {
  try {
    // Update the product data
    const [updated] = await Product.update(req.body, { where: { id: req.params.id } });

    if (!updated) return res.status(404).json({ message: 'Product not found' });

    // Handle product-tag associations if tags exist
    await manageProductTags(req.params.id, req.body.tagIds);

    res.json({ message: 'Product updated' });
  } catch (err) {
    handleError(res, err, 400);
  }
});

// Delete product by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.destroy({ where: { id: req.params.id } });

    if (!result) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted' });
  } catch (err) {
    handleError(res, err);
  }
});

module.exports = router;
