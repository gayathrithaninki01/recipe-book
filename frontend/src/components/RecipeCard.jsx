import React from 'react';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop';

export default function RecipeCard({ recipe, onEdit, onDelete, onView }) {
  const { title, category, imageUrl, ingredients } = recipe;

  return (
    <div className="recipe-card">
      <div className="card-header">
        <div className="card-title-group">
          <h3 className="card-title">{title}</h3>
          <div className="card-meta">
            <span className="card-category">{category}</span>
          </div>
        </div>
        <div className="card-quick-actions">
          <button className="icon-btn edit-icon" title="Edit Recipe" onClick={() => onEdit(recipe)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button className="icon-btn view-icon" title="View Details" onClick={() => onView(recipe)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
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
        <div className="image-overlay">
          <span>Click to view recipe</span>
        </div>
      </div>

      <div className="card-ingredients">
        <p className="ingredients-label">Ingredients:</p>
        <ul>
          {(ingredients || []).slice(0, 6).map((ing, i) => (
            <li key={i}>
              <span>
                {ing.quantity && <strong>{ing.quantity} </strong>}
                {ing.unit && <span className="unit">{ing.unit} </span>}
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
        <button className="btn btn-edit" onClick={() => onEdit(recipe)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(recipe._id)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
