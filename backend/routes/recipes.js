const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { CATEGORIES } = require('../models/Recipe');
const upload = require('../middleware/upload');

// ─── GET /api/recipes/categories ───────────────────────────────────────────
router.get('/categories', (req, res) => {
  res.json({ categories: CATEGORIES });
});

// ─── GET /api/recipes ──────────────────────────────────────────────────────
// Query params: ?search=chicken&category=Main+Dishes
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (category && category !== 'All Recipes') {
      filter.category = category;
    }

    if (search && search.trim()) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'ingredients.name': { $regex: search, $options: 'i' } },
      ];
    }

    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: recipes.length, data: recipes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/recipes/:id ──────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    res.json({ success: true, data: recipe });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /api/recipes ─────────────────────────────────────────────────────
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, category, steps } = req.body;

    // Parse ingredients (sent as JSON string from form-data)
    let ingredients = [];
    if (req.body.ingredients) {
      try {
        ingredients = JSON.parse(req.body.ingredients);
      } catch {
        ingredients = req.body.ingredients;
      }
    }

    // Parse steps
    let parsedSteps = [];
    if (steps) {
      try {
        parsedSteps = JSON.parse(steps);
      } catch {
        parsedSteps = Array.isArray(steps) ? steps : [steps];
      }
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : req.body.imageUrl || '';

    const recipe = await Recipe.create({
      title,
      ingredients,
      steps: parsedSteps,
      category,
      imageUrl,
    });

    res.status(201).json({ success: true, data: recipe });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ─── PUT /api/recipes/:id ──────────────────────────────────────────────────
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    const { title, category, steps } = req.body;

    let ingredients = recipe.ingredients;
    if (req.body.ingredients) {
      try {
        ingredients = JSON.parse(req.body.ingredients);
      } catch {
        ingredients = req.body.ingredients;
      }
    }

    let parsedSteps = recipe.steps;
    if (steps) {
      try {
        parsedSteps = JSON.parse(steps);
      } catch {
        parsedSteps = Array.isArray(steps) ? steps : [steps];
      }
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : req.body.imageUrl !== undefined
      ? req.body.imageUrl
      : recipe.imageUrl;

    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, steps: parsedSteps, category, imageUrl },
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ─── DELETE /api/recipes/:id ───────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    res.json({ success: true, message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
