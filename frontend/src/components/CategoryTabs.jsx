import React from 'react';

const CATEGORIES = [
  'All Recipes',
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

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="category-tabs-wrapper">
      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cat-tab${active === cat ? ' active' : ''}`}
            onClick={() => onChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
