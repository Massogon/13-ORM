const router = require('express').Router();
const { Category, Product } = require('../../models');
const { body, validationResult } = require('express-validator');
const { Sequelize } = require('sequelize');

// The `/api/categories` endpoint

// Get all categories and include associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'An error occurred while retrieving categories.' });
  }
});

// Get a single category by id and include associated Products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }
    res.json(category);
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json({ error: 'An error occurred while retrieving the category.' });
  }
});

// Create a new category with validation
router.post(
  '/',
  [
    body('category_name').notEmpty().withMessage('Category name is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCategory = await Category.create(req.body);
      res.status(201).json(newCategory);
    } catch (err) {
      console.error('Error creating category:', err);
      res.status(400).json({ error: 'An error occurred while creating the category.' });
    }
  }
);

// Update a category by id with validation
router.put(
  '/:id',
  [
    body('category_name').notEmpty().withMessage('Category name is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const [updated] = await Category.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedCategory = await Category.findByPk(req.params.id);
        res.json(updatedCategory);
      } else {
        res.status(404).json({ message: 'Category not found.' });
      }
    } catch (err) {
      console.error('Error updating category:', err);
      res.status(400).json({ error: 'An error occurred while updating the category.' });
    }
  }
);

// Delete a category by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Category deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Category not found.' });
    }
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'An error occurred while deleting the category.' });
  }
});

module.exports = router;
