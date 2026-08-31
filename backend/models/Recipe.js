const mongoose = require('mongoose');

const CATEGORIES = [
  'Main Dishes',
  'Side Dishes',
  'Appetizers',
  'Soups & Stews',
  'Salads',
  'Breakfast',
  'Desserts',
  'Baked Goods',
  'Snacks',
  'Beverages',
  'Other',
];

const ingredientSchema = new mongoose.Schema({
  quantity: { type: String, default: '' },
  unit: { type: String, default: '' },
  name: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
    },
    ingredients: {
      type: [ingredientSchema],
      default: [],
    },
    steps: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: CATEGORIES,
      default: 'Other',
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Text index for search
recipeSchema.index({ title: 'text', 'ingredients.name': 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);
module.exports.CATEGORIES = CATEGORIES;
