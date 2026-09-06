import React from 'react';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop';

export default function RecipeCard({ recipe, onEdit, onDelete, onView }) {
  const { title, category, imageUrl, ingredients } = recipe;

  return (
    <div className="recipe-card">
      <div className="card-header">
        <div style={{ flex: 1, paddingRight: '8px' }}>
          <h3 className="card-title">{title}</h3>
          <div className="card-meta">
            <span className="card-category">{category}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className="icon-btn edit-icon" title="Edit Recipe" onClick={() => onEdit(recipe)}>
            ✏️
          </button>
          <button className="icon-btn view-icon" title="View Details" onClick={() => onView(recipe)}>
            ↗
          </button>
        </div>
      </div>

      <div className="card-image-wrapper" onClick={() => onView(recipe)}>
        <img
          src={imageUrl || PLACEHOLDER}
          alt={title}
          className="card-image"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
      </div>

      <div className="card-ingredients">
        <p className="ingredients-label">Ingredients:</p>
        <ul>
          {(ingredients || []).slice(0, 6).map((ing, i) => (
            <li key={i}>
              <span>
                {ing.quantity && <strong>{ing.quantity} </strong>}
                {ing.unit && <span>{ing.unit} </span>}
                {ing.name}
              </span>
            </li>
          ))}
          {ingredients && ingredients.length > 6 && (
            <li className="more-ingredients">+{ingredients.length - 6} more ingredients...</li>
          )}
        </ul>
      </div>

      <div className="card-actions">
        <button className="btn btn-edit" onClick={() => onEdit(recipe)}>✏️ Edit</button>
        <button className="btn btn-delete" onClick={() => onDelete(recipe._id)}>🗑️ Delete</button>
      </div>
    </div>
  );
}
