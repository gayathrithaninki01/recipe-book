import React, { useState, useEffect, useCallback } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from '../api/recipeApi';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeCategory, setActiveCategory] = useState('All Recipes');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [viewingRecipe, setViewingRecipe] = useState(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (activeCategory !== 'All Recipes') params.category = activeCategory;
      if (search.trim()) params.search = search.trim();
      const data = await getRecipes(params);
      setRecipes(data.data || []);
    } catch (err) {
      setError('Failed to load recipes. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, [activeCategory, search]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // ── CRUD handlers ──────────────────────────────────────────
  const handleSave = async (formData, id) => {
    if (id) {
      await updateRecipe(id, formData);
    } else {
      await createRecipe(formData);
    }
    await fetchRecipes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this recipe?')) return;
    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert('Failed to delete recipe.');
    }
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setViewingRecipe(null);
    setModalOpen(true);
  };

  const handleView = (recipe) => {
    setViewingRecipe(recipe);
  };

  const handleAddNew = () => {
    setEditingRecipe(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingRecipe(null);
  };

  return (
    <div className="page">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="app-header">
        <h1 className="app-title">Recipe Manager</h1>
        <div className="header-actions">
          <button className="btn btn-dark" onClick={handleAddNew}>
            ＋ Add New Recipe
          </button>
        </div>
      </header>

      {/* ── Search ─────────────────────────────────────────── */}
      <div className="search-wrapper">
        <SearchBar value={searchInput} onChange={setSearchInput} />
      </div>

      {/* ── Category Tabs ──────────────────────────────────── */}
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

      {/* ── Recipe Grid ────────────────────────────────────── */}
      <main className="recipe-grid-wrapper">
        {loading ? (
          <div className="center-msg">
            <div className="spinner" />
            <p>Loading recipes...</p>
          </div>
        ) : error ? (
          <div className="center-msg error-msg">
            <p>{error}</p>
            <button className="btn btn-dark" onClick={fetchRecipes}>Retry</button>
          </div>
        ) : recipes.length === 0 ? (
          <div className="center-msg">
            <p className="empty-text">
              {search || activeCategory !== 'All Recipes'
                ? 'No recipes match your search.'
                : 'No recipes yet. Add your first recipe!'}
            </p>
            {!search && activeCategory === 'All Recipes' && (
              <button className="btn btn-dark" onClick={handleAddNew}>+ Add Recipe</button>
            )}
          </div>
        ) : (
          <div className="recipe-grid">
            {recipes.map((r) => (
              <RecipeCard
                key={r._id}
                recipe={r}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Modals ─────────────────────────────────────────── */}
      {modalOpen && (
        <RecipeModal
          recipe={editingRecipe}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}

      {viewingRecipe && !modalOpen && (
        <RecipeDetailModal
          recipe={viewingRecipe}
          onClose={() => setViewingRecipe(null)}
          onEdit={(r) => { setViewingRecipe(null); handleEdit(r); }}
        />
      )}
    </div>
  );
}
