import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const token = localStorage.getItem('token');

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await API.get('categories', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data);

      //  const { data } = await api.get('/categories');
      setCategories(res.data);
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
    /*try {
      const { data } = await api.delete(`/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
      setMessage('✅ ' + data.message);
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || err.message));
    }*/
    try {
      await API.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
      toast.success('Category deleted');
      // fetchUserPosts();
    } catch (error) {
      toast.error('Failed to delete Category' + error);
    }
  };

  // Enable edit mode
  const startEdit = (cat) => {
    setEditingId(cat._id);
    setEditName(cat.name);
  };

  // Save updated category
  const saveEdit = async (id) => {
    try {
      console.log(id);
      const { data } = await API.put(`/categories/${id}`, { name: editName });
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
            <li
              key={cat._id}
              className="flex justify-between items-center py-2 gap-2"
            >
              {editingId === cat._id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 border px-2 py-1 rounded-md focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => saveEdit(cat._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="text-gray-800 font-medium">{cat.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(cat)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(cat._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
