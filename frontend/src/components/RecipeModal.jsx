import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  'Main Dishes', 'Side Dishes', 'Appetizers', 'Soups & Stews',
  'Salads', 'Breakfast', 'Desserts', 'Baked Goods', 'Snacks', 'Beverages', 'Other',
];

const EMPTY_INGREDIENT = { quantity: '', unit: '', name: '' };

const defaultForm = {
  title: '',
  category: 'Main Dishes',
  imageUrl: '',
  ingredients: [{ ...EMPTY_INGREDIENT }],
  steps: [''],
};

export default function RecipeModal({ recipe, onClose, onSave }) {
  const [form, setForm] = useState(defaultForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (recipe) {
      setForm({
        title: recipe.title || '',
        category: recipe.category || 'Main Dishes',
        imageUrl: recipe.imageUrl || '',
        ingredients: recipe.ingredients?.length
          ? recipe.ingredients.map((i) => ({ quantity: i.quantity || '', unit: i.unit || '', name: i.name || '' }))
          : [{ ...EMPTY_INGREDIENT }],
        steps: recipe.steps?.length ? recipe.steps : [''],
      });
      setImagePreview(recipe.imageUrl || '');
    } else {
      setForm(defaultForm);
      setImagePreview('');
    }
    setImageFile(null);
    setError('');
  }, [recipe]);

  // ── Ingredient helpers ───────────────────────────────────────
  const updateIngredient = (idx, field, val) => {
    const updated = form.ingredients.map((ing, i) =>
      i === idx ? { ...ing, [field]: val } : ing
    );
    setForm({ ...form, ingredients: updated });
  };

  const addIngredient = () =>
    setForm({ ...form, ingredients: [...form.ingredients, { ...EMPTY_INGREDIENT }] });

  const removeIngredient = (idx) =>
    setForm({ ...form, ingredients: form.ingredients.filter((_, i) => i !== idx) });

  // ── Step helpers ─────────────────────────────────────────────
  const updateStep = (idx, val) => {
    const updated = form.steps.map((s, i) => (i === idx ? val : s));
    setForm({ ...form, steps: updated });
  };

  const addStep = () => setForm({ ...form, steps: [...form.steps, ''] });

  const removeStep = (idx) =>
    setForm({ ...form, steps: form.steps.filter((_, i) => i !== idx) });

  // ── Image ────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Recipe title is required.');
      return;
    }

    setSaving(true);
    setError('');

    const fd = new FormData();
    fd.append('title', form.title.trim());
    fd.append('category', form.category);
    fd.append('ingredients', JSON.stringify(form.ingredients.filter((i) => i.name.trim())));
    fd.append('steps', JSON.stringify(form.steps.filter((s) => s.trim())));
    if (imageFile) {
      fd.append('image', imageFile);
    } else {
      fd.append('imageUrl', form.imageUrl);
    }

    try {
      await onSave(fd, recipe?._id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save recipe.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>{recipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          {error && <div className="alert-error">{error}</div>}

          {/* Title */}
          <label>Recipe Title *</label>
          <input
            className="input"
            type="text"
            placeholder="e.g. Chicken Fried Rice"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* Category */}
          <label>Category</label>
          <select
            className="input"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>

          {/* Image */}
          <label>Recipe Image</label>
          <div className="image-upload-area">
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="image-preview"
                onError={(e) => { e.target.style.display = 'none'; }} />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <p className="or-text">— or paste image URL —</p>
            <input
              className="input"
              type="text"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setImagePreview(e.target.value); setImageFile(null); }}
            />
          </div>

          {/* Ingredients */}
          <label>Ingredients</label>
          {form.ingredients.map((ing, idx) => (
            <div className="ingredient-row" key={idx}>
              <input className="input small" placeholder="Qty" value={ing.quantity}
                onChange={(e) => updateIngredient(idx, 'quantity', e.target.value)} />
              <input className="input small" placeholder="Unit" value={ing.unit}
                onChange={(e) => updateIngredient(idx, 'unit', e.target.value)} />
              <input className="input flex-1" placeholder="Ingredient name *" value={ing.name}
                onChange={(e) => updateIngredient(idx, 'name', e.target.value)} />
              {form.ingredients.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeIngredient(idx)}>✕</button>
              )}
            </div>
          ))}
          <button type="button" className="add-row-btn" onClick={addIngredient}>+ Add Ingredient</button>

          {/* Steps */}
          <label>Preparation Steps</label>
          {form.steps.map((step, idx) => (
            <div className="step-row" key={idx}>
              <span className="step-num">{idx + 1}.</span>
              <textarea
                className="input flex-1"
                placeholder={`Step ${idx + 1}...`}
                value={step}
                rows={2}
                onChange={(e) => updateStep(idx, e.target.value)}
              />
              {form.steps.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeStep(idx)}>✕</button>
              )}
            </div>
          ))}
          <button type="button" className="add-row-btn" onClick={addStep}>+ Add Step</button>

          {/* Actions */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : recipe ? 'Update Recipe' : 'Add Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
