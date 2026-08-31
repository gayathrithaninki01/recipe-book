import React from 'react';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop';

export default function RecipeDetailModal({ recipe, onClose, onEdit }) {
  if (!recipe) return null;
  const { title, category, imageUrl, ingredients, steps, createdAt } = recipe;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-detail">
        <div className="modal-header">
          <div>
            <h2>{title}</h2>
            <span className="card-category">{category}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-edit" onClick={() => { onEdit(recipe); }}>Edit</button>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal-body">
          <img
            src={imageUrl || PLACEHOLDER}
            alt={title}
            className="detail-image"
            onError={(e) => { e.target.src = PLACEHOLDER; }}
          />

          <div className="detail-sections">
            {/* Ingredients */}
            <section>
              <h3>Ingredients</h3>
              {ingredients && ingredients.length > 0 ? (
                <ul className="detail-list">
                  {ingredients.map((ing, i) => (
                    <li key={i}>
                      {ing.quantity && <strong>{ing.quantity} </strong>}
                      {ing.unit && <span>{ing.unit} </span>}
                      {ing.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-text">No ingredients listed.</p>
              )}
            </section>

            {/* Steps */}
            <section>
              <h3>Preparation Steps</h3>
              {steps && steps.length > 0 ? (
                <ol className="detail-steps">
                  {steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="empty-text">No steps listed.</p>
              )}
            </section>

            {createdAt && (
              <p className="detail-date">
                Added: {new Date(createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
