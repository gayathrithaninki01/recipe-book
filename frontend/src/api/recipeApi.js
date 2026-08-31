import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL || ''}/api/recipes`;

export const getRecipes = (params = {}) =>
  axios.get(API_BASE, { params }).then((r) => r.data);

export const getRecipeById = (id) =>
  axios.get(`${API_BASE}/${id}`).then((r) => r.data);

export const createRecipe = (formData) =>
  axios.post(API_BASE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);

export const updateRecipe = (id, formData) =>
  axios.put(`${API_BASE}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);

export const deleteRecipe = (id) =>
  axios.delete(`${API_BASE}/${id}`).then((r) => r.data);

export const getCategories = () =>
  axios.get(`${API_BASE}/categories`).then((r) => r.data);
