const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Helper function for centralized error handling
const handleError = (res, err, statusCode = 500) => {
  console.error(err);
  res.status(statusCode).json({ error: err.message || 'Something went wrong' });
};

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.json(tags);
  } catch (err) {
    handleError(res, err);
  }
});

// Get one tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json(tag);
  } catch (err) {
    handleError(res, err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    // Optional: Validate req.body here before creating the tag
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    handleError(res, err, 400);
  }
});

// Delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!result) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json({ message: 'Tag deleted' });
  } catch (err) {
    handleError(res, err);
  }
});

// Update a tag by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json({ message: 'Tag updated' });
  } catch (err) {
    handleError(res, err, 400);
  }
});

module.exports = router;
