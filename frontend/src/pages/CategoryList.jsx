import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CategoryItem from '../components/CategoryItem';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await API.get('categories');
      setCategories(res);
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?'))
      return;
    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
      toast.success('Category deleted');
    } catch (error) {
      toast.error('Failed to delete Category ' + error);
    }
  };

  // Save updated category
  const saveCategory = async (id, name) => {
    try {
      const { data } = await API.put(`/categories/${id}`, { name });
      setCategories(
        categories.map((cat) =>
          cat._id === id ? { ...cat, name: data.name } : cat
        )
      );
      setEditingId(null);
      setMessage('✅ Category updated');
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <p className="text-gray-600">Loading categories...</p>;

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white shadow-md rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Your Categories</h2>
        <Link
          to="/category/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Category
        </Link>
      </div>

      {message && (
        <p className="mb-3 text-sm text-gray-700 font-medium">{message}</p>
      )}

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories yet. Add one above 👆</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {categories.map((cat) => (
            <CategoryItem
              key={cat._id}
              cat={cat}
              isEditing={editingId === cat._id}
              setEditingId={setEditingId}
              saveCategory={saveCategory}
              deleteCategory={deleteCategory}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
