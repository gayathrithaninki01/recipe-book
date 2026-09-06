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
            <button className="btn btn-edit" onClick={() => { onEdit(recipe); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit
            </button>
            <button className="modal-close" onClick={onClose} title="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
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
